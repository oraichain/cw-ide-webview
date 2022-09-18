import { computed, makeObservable, observable, action } from "mobx";

import {
  ChainInfoInner,
  ChainStore as BaseChainStore
} from "@keplr-wallet/stores";

import { ChainInfo } from "@keplr-wallet/types";

export interface ChainInfoWithExplorer extends ChainInfo {
  // Formed as "https://explorer.com/{txHash}"
  explorerUrlToTx?: string;
  faucet?: string;
  cosmwasmVersion: string;
}

/**
 * A ChainStore class containing a list of Cosmos chains for deployment & interaction. It also uses Oraichain cosmosjs to encode, query, and broadcast transactions
 */
export class ChainStore extends BaseChainStore<ChainInfoWithExplorer> {
  @observable
  protected chainId: string;
  protected embedChainArr: Array<ChainInfo>;

  /**
   * Constructor of the ChainStore class. By default, we choose the first chain info in the list of chain infos.
   * @param embedChainInfos - a list of Cosmos chains info.
   */
  constructor(embedChainInfos: ChainInfoWithExplorer[]) {
    // get chains from local storage first. If empty then set it. If not then use it instead of default
    let chains: string | ChainInfoWithExplorer[] | null =
      localStorage.getItem("chain-info");
    if (!chains) {
      chains = embedChainInfos;
      // store chain into local storage
      // localStorage.setItem('chain-info', JSON.stringify(embedChainInfos));
    } else {
      // parse the local storage data cuz when we store we have stringtified it
      chains = [
        ...embedChainInfos,
        ...JSON.parse(chains)
      ] as ChainInfoWithExplorer[];
    }

    super(chains);
    this.chainId = chains[0].chainId || "Oraichain";
    this.embedChainArr = embedChainInfos;
    makeObservable(this);
  }

  @computed
  get current(): ChainInfoWithExplorer {
    if (this.hasChain(this.chainId)) {
      return this.getChain(this.chainId).raw;
    }

    throw new Error(`chain id not set`);
  }

  @computed
  get currentFluent() {
    if (this.hasChain(this.chainId)) {
      return this.getChain(this.chainId);
    }

    throw new Error("chain id not set");
  }

  /**
   * Update chain id and other relevant info for cosmosjs & chain info
   * @param chainName
   */

  @action
  setChain(chainName: string) {
    let chainId = this.getChainId(chainName);
    console.log("chain id: ", chainId);
    this.setChainId(chainId);
  }

  @action
  addChain(chainInfo: ChainInfoWithExplorer) {
    // the new chain info must have a different chain id & chain name
    // let chainInfos = this.getChainInfosRaw();
    let chainInfos = JSON.parse(localStorage.getItem("chain-info") || "[]");
    let isTheSameInfo =
      chainInfos &&
      chainInfos.filter(
        info =>
          info.chainId === chainInfo.chainId ||
          info.chainName === chainInfo.chainName
      );
    if (isTheSameInfo.length > 0) {
      throw "This chain is already included. Cannot add in the list";
    }
    chainInfos.push(chainInfo);
    // this.setChainInfos(chainInfos);
    this.setChainInfos([...this.embedChainArr, ...chainInfos]);
    // also update in local storage
    localStorage.setItem("chain-info", JSON.stringify(chainInfos));
  }

  @action
  removeChain(chainId: string) {
    // the new chain info must have a different chain id & chain name
    let chain = this.getChain(chainId);
    if (!chain) {
      throw "This chain is not in the list. Cannot remove";
    }
    // let chainInfos = this.getChainInfosRaw();
    let chainInfos = JSON.parse(localStorage.getItem("chain-info") || "[]");
    chainInfos = chainInfos.filter(info => info.chainId !== chainId);
    // this.setChainInfos(chainInfos);
    this.setChainInfos([...this.embedChainArr, ...chainInfos]);
    // also update in local storage
    localStorage.setItem("chain-info", JSON.stringify(chainInfos));
  }
  private getChainId(chainName: string) {
    if (chainName) {
      let chainInfo = this.chainInfos.find(
        info => info.chainName === chainName
      );
      if (chainInfo) return chainInfo.chainId;
      throw new Error(`Chain id not found from chain name: ${chainName}`);
    }
    throw new Error("Invalid chain name");
  }
  private getChainInfosRaw() {
    let chainInfos: ChainInfoWithExplorer[] = [];
    for (let chainInfo of this.chainInfos) {
      chainInfos.push(chainInfo.raw);
    }
    return chainInfos;
  }

  @action
  private setChainId(chainId: string) {
    if (chainId) {
      this.chainId = chainId;
    }
  }
}
