import {
  Account,
  ProgramManager,
  initThreadPool,
} from "@aleohq/sdk";
import { expose } from "comlink";


await initThreadPool();

async function localProgramExecution(program, aleoFunction, inputs) {
  const programManager = new ProgramManager();

  // Create a temporary account for the execution of the program
  const account = new Account({
    privateKey: process.env.PRIVATE_KEY,
  });
  programManager.setAccount(account);

  const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false,
  );
  return executionResponse.getOutputs();
}

const workerMethods = { localProgramExecution };
expose(workerMethods);