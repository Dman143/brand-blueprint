const TRANSIENT_STATUSES=new Set([408,425,429,500,502,503,504])
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))

export class InterpretationConflictError extends Error{constructor(code){super(code);this.name='InterpretationConflictError';this.code=code}}

const candidatesFrom=payload=>Array.isArray(payload)?payload:Array.isArray(payload?.candidates)?payload.candidates:[]
const completedBrandBlueprints=payload=>candidatesFrom(payload).filter(candidate=>candidate?.assessmentType==='BRAND_BLUEPRINT'&&candidate?.status==='COMPLETED')
const urlFor=(base,submissionId)=>`${base.replace(/\/$/,'')}/api/admin/activation-candidates?submissionId=${encodeURIComponent(submissionId)}`
const interpretationUrl=base=>`${base.replace(/\/$/,'')}/api/admin/first-blueprint-interpretation`

async function requestWithTransientRetry(fetchImpl,url,options,attempts=2){
 let response
 for(let attempt=0;attempt<attempts;attempt++){
  try{response=await fetchImpl(url,{...options,signal:AbortSignal.timeout(5000)})}catch(error){if(attempt===attempts-1)throw error;await wait(100);continue}
  if(!TRANSIENT_STATUSES.has(response.status)||attempt===attempts-1)return response
  await wait(100)
 }
 return response
}

async function readCandidate({fetchImpl,baseUrl,token,submissionId}){
 const response=await requestWithTransientRetry(fetchImpl,urlFor(baseUrl,submissionId),{headers:{authorization:`Bearer ${token}`}})
 if(!response.ok)throw new Error(`Activation candidate lookup failed (${response.status})`)
 const matches=completedBrandBlueprints(await response.json())
 if(matches.length!==1)throw new Error(`Expected exactly one completed BRAND_BLUEPRINT candidate; found ${matches.length}`)
 const candidate=matches[0]
 if(typeof candidate.assessmentFingerprint!=='string'||!candidate.assessmentFingerprint||typeof candidate.firstBlueprintPriority!=='string'||!candidate.firstBlueprintPriority)throw new Error('Activation candidate binding is incomplete')
 return candidate
}

export async function persistFirstBlueprintInterpretation({submissionId,firstBlueprintHypothesis,baseUrl=process.env.ENGINE_BASE_URL,token=process.env.DANIEL_TOKEN,fetchImpl=fetch,confirmActivation=true}){
 if(!baseUrl||!token)throw new Error('ENGINE_BASE_URL and DANIEL_TOKEN are required')
 if(typeof submissionId!=='string'||!submissionId.trim()||typeof firstBlueprintHypothesis!=='string'||!firstBlueprintHypothesis.trim())throw new Error('Submission ID and exact First Blueprint hypothesis are required')
 const exactSubmissionId=submissionId
 const candidate=await readCandidate({fetchImpl,baseUrl,token,submissionId:exactSubmissionId})
 const body={submissionId:exactSubmissionId,assessmentFingerprint:candidate.assessmentFingerprint,firstBlueprintPriority:candidate.firstBlueprintPriority,firstBlueprintHypothesis}
 const response=await requestWithTransientRetry(fetchImpl,interpretationUrl(baseUrl),{method:'POST',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify(body)})
 const result=await response.json().catch(()=>({}))
 if(response.status===409){const code=result?.code||result?.error?.code||result?.error||'INTERPRETATION_CONFLICT';throw new InterpretationConflictError(code)}
 if(!response.ok)throw new Error(`First Blueprint interpretation persistence failed (${response.status})`)
 let activationReady
 if(confirmActivation){const confirmed=await readCandidate({fetchImpl,baseUrl,token,submissionId:exactSubmissionId});activationReady=confirmed.activationReady===true}
 return {persisted:true,replay:result?.replay===true,activationReady,body}
}
