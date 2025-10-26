/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  VCPackIssuer,
  VCPackIssuer_ApprovalForAll,
  VCPackIssuer_MilestoneApproved,
  VCPackIssuer_MilestoneRejected,
  VCPackIssuer_MilestoneSubmitted,
  VCPackIssuer_OwnershipTransferred,
  VCPackIssuer_PackCreated,
  VCPackIssuer_PackMilestones,
  VCPackIssuer_PackMinted,
  VCPackIssuer_TransferBatch,
  VCPackIssuer_TransferSingle,
  VCPackIssuer_URI,
} from "generated";

VCPackIssuer.ApprovalForAll.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_ApprovalForAll = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    account: event.params.account,
    operator: event.params.operator,
    approved: event.params.approved,
  };

  context.VCPackIssuer_ApprovalForAll.set(entity);
});

VCPackIssuer.MilestoneApproved.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_MilestoneApproved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    holder: event.params.holder,
    packId: event.params.packId,
    milestoneIndex: event.params.milestoneIndex,
    feedback: event.params.feedback,
    newProgress: event.params.newProgress,
  };

  context.VCPackIssuer_MilestoneApproved.set(entity);
});

VCPackIssuer.MilestoneRejected.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_MilestoneRejected = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    holder: event.params.holder,
    packId: event.params.packId,
    feedback: event.params.feedback,
    milestoneIndex: event.params.milestoneIndex,
  };

  context.VCPackIssuer_MilestoneRejected.set(entity);
});

VCPackIssuer.MilestoneSubmitted.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_MilestoneSubmitted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    holder: event.params.holder,
    packId: event.params.packId,
    milestoneIndex: event.params.milestoneIndex,
    proofCID: event.params.proofCID,
  };

  context.VCPackIssuer_MilestoneSubmitted.set(entity);
});

VCPackIssuer.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.VCPackIssuer_OwnershipTransferred.set(entity);
});

VCPackIssuer.PackCreated.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_PackCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    packId: event.params.packId,
    name: event.params.name,
    description: event.params.description,
    milestoneCount: event.params.milestoneCount,
  };

  context.VCPackIssuer_PackCreated.set(entity);
});

VCPackIssuer.PackMilestones.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_PackMilestones = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    packId: event.params.packId,
    event_id: event.params.id,
    title: event.params.title,
    description: event.params.description,
    required: event.params.required,
  };

  context.VCPackIssuer_PackMilestones.set(entity);
});

VCPackIssuer.PackMinted.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_PackMinted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    holder: event.params.holder,
    packId: event.params.packId,
  };

  context.VCPackIssuer_PackMinted.set(entity);
});

VCPackIssuer.TransferBatch.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_TransferBatch = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    operator: event.params.operator,
    from: event.params.from,
    to: event.params.to,
    ids: event.params.ids,
    values: event.params.values,
  };

  context.VCPackIssuer_TransferBatch.set(entity);
});

VCPackIssuer.TransferSingle.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_TransferSingle = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    operator: event.params.operator,
    from: event.params.from,
    to: event.params.to,
    event_id: event.params.id,
    value: event.params.value,
  };

  context.VCPackIssuer_TransferSingle.set(entity);
});

VCPackIssuer.URI.handler(async ({ event, context }) => {
  const entity: VCPackIssuer_URI = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    value: event.params.value,
    event_id: event.params.id,
  };

  context.VCPackIssuer_URI.set(entity);
});
