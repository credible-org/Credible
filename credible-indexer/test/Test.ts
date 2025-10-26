import assert from "assert";
import { 
  TestHelpers,
  VCPackIssuer_ApprovalForAll
} from "generated";
const { MockDb, VCPackIssuer } = TestHelpers;

describe("VCPackIssuer contract ApprovalForAll event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for VCPackIssuer contract ApprovalForAll event
  const event = VCPackIssuer.ApprovalForAll.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("VCPackIssuer_ApprovalForAll is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await VCPackIssuer.ApprovalForAll.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualVCPackIssuerApprovalForAll = mockDbUpdated.entities.VCPackIssuer_ApprovalForAll.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedVCPackIssuerApprovalForAll: VCPackIssuer_ApprovalForAll = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      account: event.params.account,
      operator: event.params.operator,
      approved: event.params.approved,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualVCPackIssuerApprovalForAll, expectedVCPackIssuerApprovalForAll, "Actual VCPackIssuerApprovalForAll should be the same as the expectedVCPackIssuerApprovalForAll");
  });
});
