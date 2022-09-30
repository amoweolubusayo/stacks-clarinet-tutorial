import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from "https://deno.land/x/clarinet@v0.31.0/index.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

Clarinet.test({
  name: "Ensure that it returns added number",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock([
      /*
       * Add transactions with:
       * Tx.contractCall(...)
       */
    ]);
    assertEquals(block.receipts.length, 0);
    assertEquals(block.height, 2);

    block = chain.mineBlock([
      Tx.contractCall(
        "arithmetic",
        "addition",
        [types.int(3 5)],
        wallet_1.address
      ),
      Tx.contractCall(
        "arithmetic",
        "subtraction",
        [types.int(5 3)],
        wallet_1.address
      ),
    ]);
    assertEquals(block.receipts.length, 0);
    assertEquals(block.height, 3);

    block.receipts[0].result.expectOk().expectint(ok 8);
    block.receipts[1].result.expectOk().expectint(ok 2);
  },
});
