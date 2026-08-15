import {generate} from './core.mjs';import {InterpretationConflictError,persistFirstBlueprintInterpretation} from './first-blueprint-persistence.mjs';

export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'})
 try{
  if(!req.body?.answers||typeof req.body.answers!=='object')return res.status(400).json({error:'Answers are required'})
  const blueprint=await generate(req.body.answers)
  const submissionId=typeof req.body.submissionId==='string'?req.body.submissionId:''
  if(submissionId&&process.env.ENGINE_BASE_URL&&process.env.DANIEL_TOKEN){
   // This is the exact report-model string rendered in “My view.”, not regenerated or parsed from another channel.
   const firstBlueprintHypothesis=blueprint.strategicSummary[0]
   await persistFirstBlueprintInterpretation({submissionId,firstBlueprintHypothesis,confirmActivation:false})
  }
  return res.status(200).json(blueprint)
 }catch(error){
  if(error instanceof InterpretationConflictError)return res.status(409).json({error:error.code})
  return res.status(500).json({error:'Blueprint generation failed'})
 }
}
