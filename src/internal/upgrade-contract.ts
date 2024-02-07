import { promises as fs } from 'fs';

import { Network } from '@openzeppelin/defender-sdk-base-client';
import { DeployClient, UpgradeContractRequest } from '@openzeppelin/defender-sdk-deploy-client';

export interface FunctionArgs {
  proxyAddress: string;
  newImplementationAddress: string;
  network: Network;
  proxyAdminAddress?: string;
  abiFile?: string;
  approvalProcessId?: string;
}

export async function upgradeContract(args: FunctionArgs, client: DeployClient) {
  let newImplementationABI: string | undefined;
  if (args.abiFile !== undefined) {
    const artifactObject = JSON.parse(await fs.readFile(args.abiFile, 'utf8'));
    newImplementationABI = JSON.stringify(artifactObject.abi);
  }

  const deploymentRequest: UpgradeContractRequest = {
    proxyAddress: args.proxyAddress,
    newImplementationAddress: args.newImplementationAddress,
    network: args.network,
    proxyAdminAddress: args.proxyAdminAddress,
    newImplementationABI: newImplementationABI,
    approvalProcessId: args.approvalProcessId,
  };

  return await client.upgradeContract(deploymentRequest);
}