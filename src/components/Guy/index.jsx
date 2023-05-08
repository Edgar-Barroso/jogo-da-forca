import { createRagdoll } from '../../utils/createRagdoll'
import { BodyPart } from './components/BodyPart'
import { Face } from './components/Face'

const { shapes, joints } = createRagdoll(5.5, Math.PI / 16, Math.PI / 16, 0)

export function Guy({ score, ...props }) {
  return (<BodyPart {...props} name="upperBody">
    {(score >= 1) && <BodyPart {...props} name="head" config={joints['neckJoint']} render={<Face />} />}
    {score >= 2 && <BodyPart {...props} name="upperLeftArm" config={joints['leftShoulder']}>
      <BodyPart {...props} name="lowerLeftArm" config={joints['leftElbowJoint']} />
    </BodyPart>}
    {score >= 3 && <BodyPart {...props} name="upperRightArm" config={joints['rightShoulder']}>
      <BodyPart  {...props} name="lowerRightArm" config={joints['rightElbowJoint']} />
    </BodyPart>}
    {score >= 1 && <BodyPart {...props} name="pelvis" config={joints['spineJoint']}>
      {score >= 4 && <BodyPart {...props} name="upperLeftLeg" config={joints['leftHipJoint']}>
        <BodyPart {...props} name="lowerLeftLeg" config={joints['leftKneeJoint']} />
      </BodyPart>}
      {score >= 5 && <BodyPart {...props} name="upperRightLeg" config={joints['rightHipJoint']}>
        <BodyPart {...props} name="lowerRightLeg" config={joints['rightKneeJoint']} />
      </BodyPart>}
    </BodyPart>}
    
  </BodyPart>)
}
