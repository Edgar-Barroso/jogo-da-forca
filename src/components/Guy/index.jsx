import { createRagdoll } from '../../helpers/createRagdoll'
import { BodyPart } from './components/BodyPart'
import { Face } from './components/Face'

const { shapes, joints } = createRagdoll(5.5, Math.PI / 16, Math.PI / 16, 0)

export function Guy({ score }) {
  return (<BodyPart position={[0, 5, 0]} name="upperBody">
    {score < 5 && <BodyPart name="head" config={joints['neckJoint']} render={<Face />} />}
    {score < 4 && <BodyPart name="upperLeftArm" config={joints['leftShoulder']}>
      <BodyPart name="lowerLeftArm" config={joints['leftElbowJoint']} />
    </BodyPart>}
    {score < 3 && <BodyPart name="upperRightArm" config={joints['rightShoulder']}>
      <BodyPart name="lowerRightArm" config={joints['rightElbowJoint']} />
    </BodyPart>}
    {score < 5 && <BodyPart name="pelvis" config={joints['spineJoint']}>
      {score < 2 && <BodyPart name="upperLeftLeg" config={joints['leftHipJoint']}>
        <BodyPart name="lowerLeftLeg" config={joints['leftKneeJoint']} />
      </BodyPart>}
      {score < 1 && <BodyPart name="upperRightLeg" config={joints['rightHipJoint']}>
        <BodyPart name="lowerRightLeg" config={joints['rightKneeJoint']} />
      </BodyPart>}
    </BodyPart>}
  </BodyPart>)
}
