import React from 'react'
import { useWeb3Context } from '../context'

const ConnectButton = ({ connect }) => {
  return connect ? (
    <button id="connect" onClick={connect}>Connect</button>
  ) : (
    <button id="connect">Loading...</button>
  )
}

const DisconnectButton = ({ disconnect }) => {
  return disconnect ? (
    <button id="connect" onClick={disconnect}>Disconnect</button>
  ) : (
    <button id="connect">Loading...</button>
  )
}

export function Web3Button() {
  const { web3Provider, connect, disconnect } = useWeb3Context()

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  )
}
