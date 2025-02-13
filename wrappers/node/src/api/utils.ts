import { VCXInternalError } from '../errors';
import * as ffi from '@hyperledger/vcx-napi-rs';

export interface IPwInfo {
  pw_did: string;
  pw_vk: string;
}

export interface IMsgUnpacked {
  sender_verkey: string;
  message: string;
}

export interface IAriesService {
  id: string;
  type: string;
  priority: number;
  recipientKeys: string[];
  routingKeys: string[];
  serviceEndpoint: string;
}

export async function provisionCloudAgent(configAgent: object): Promise<string> {
  try {
    return await ffi.provisionCloudAgent(JSON.stringify(configAgent));
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export function getVersion(): string {
  try {
    return ffi.getVersion();
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function getLedgerAuthorAgreement(): Promise<string> {
  try {
    return await ffi.getLedgerAuthorAgreement();
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export function setActiveTxnAuthorAgreementMeta(
  text: string | null | undefined,
  version: string | null | undefined,
  hash: string | null | undefined,
  acceptanceMechanismType: string,
  timeOfAcceptance: number,
): void {
  try {
    ffi.setActiveTxnAuthorAgreementMeta(
      text,
      version,
      hash,
      acceptanceMechanismType,
      timeOfAcceptance,
    );
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export function shutdownVcx(deleteWallet: boolean): void {
  try {
    ffi.shutdown(deleteWallet);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export interface IUpdateWebhookUrl {
  webhookUrl: string;
}

export async function vcxUpdateWebhookUrl({ webhookUrl }: IUpdateWebhookUrl): Promise<void> {
  try {
    await ffi.updateWebhookUrl(webhookUrl);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export interface IUpdateMessagesConfigs {
  msgJson: string;
}

export async function updateMessages(updateConfig: IUpdateMessagesConfigs): Promise<void> {
  try {
    await ffi.messagesUpdateStatus('MS-106', updateConfig.msgJson);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function rotateVerkey(did: string): Promise<void> {
  try {
    await ffi.rotateVerkey(did);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function rotateVerkeyStart(did: string): Promise<string> {
  try {
    return await ffi.rotateVerkeyStart(did);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function rotateVerkeyApply(did: string, tempVk: string): Promise<void> {
  try {
    await ffi.rotateVerkeyApply(did, tempVk);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function getVerkeyFromWallet(did: string): Promise<string> {
  try {
    return await ffi.getVerkeyFromWallet(did);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function getVerkeyFromLedger(did: string): Promise<string> {
  try {
    return await ffi.getVerkeyFromLedger(did);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function getLedgerTxn(did: string, seqNo: number): Promise<string> {
  try {
    return await ffi.getLedgerTxn(seqNo, did);
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function createPwInfo(): Promise<IPwInfo> {
  try {
    return JSON.parse(await ffi.createPairwiseInfo());
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function createService(
  target_did: string,
  endpoint: string,
  recipientKeys: string[],
  routingKeys: string[],
): Promise<IAriesService> {
  try {
    return JSON.parse(await ffi.createService(target_did, recipientKeys, routingKeys, endpoint));
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function getServiceFromLedger(did: string): Promise<IAriesService> {
  try {
    return JSON.parse(await ffi.getServiceFromLedger(did));
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}

export async function unpack(data: Buffer): Promise<IMsgUnpacked> {
  try {
    return JSON.parse(await ffi.unpack(data));
  } catch (err: any) {
    throw new VCXInternalError(err);
  }
}
