import minimist from "minimist";
import { deploy } from './commands/deploy';
import { proposeUpgrade } from './commands/propose-upgrade';
import { getApprovalProcess } from "./commands/get-approval-process";

const USAGE = 'Usage: npx @openzeppelin/defender-deploy-client-cli <COMMAND> <OPTIONS>';
const DETAILS = `
Performs actions using OpenZeppelin Defender.

Available commands:
  deploy  Deploys a contract.
  proposeUpgrade  Proposes an upgrade.
  getDeployApprovalProcess  Gets the deploy approval process configured for a network.
  getUpgradeApprovalProcess  Gets the upgrade approval process configured for a network.

Run 'npx @openzeppelin/defender-deploy-client-cli <COMMAND> --help' for more information on a command.
`;

export async function main(args: string[]): Promise<void> {
  const regularArgs = minimist(args)._;

  if (regularArgs.length === 0) {
    console.log(USAGE);
    console.log(DETAILS);
  } else {
    if (regularArgs[0] === 'deploy') {
      await deploy(args.slice(1));
    } else if (regularArgs[0] === 'proposeUpgrade') {
      await proposeUpgrade(args.slice(1));
    } else if (regularArgs[0] === 'getDeployApprovalProcess' || regularArgs[0] === 'getUpgradeApprovalProcess') {
      await getApprovalProcess(regularArgs[0], args.slice(1));
    } else {
      throw new Error(`\
Unknown command: ${regularArgs[0]}
Run 'npx @openzeppelin/defender-deploy-client-cli --help' for usage.\
`);
    }
  }
}
