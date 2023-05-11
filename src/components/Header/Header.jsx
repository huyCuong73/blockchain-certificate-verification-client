import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { useEffect } from "react";
import { CryptoCards, Button } from "@web3uikit/core";
import { formatUnits } from "@ethersproject/units";
import truncateEthAddress from "truncate-eth-address";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';


import Avatar from "../Avatar/Avatar";
import styles from "./header.module.scss";
import { logout } from "../../redux/actions/user";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11155111],
});

const Header = () => {
	const user = useSelector(state => state.user.user)

	const { activate, account, chainId, deactivate, library } = useWeb3React();
	const [balance, setBalance] = useState(0);

	const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split("/");

	const dispatch = useDispatch()

	useEffect(() => {
		if (account && library) {
		library.getBalance(account).then((balance) => {
			setBalance(formatUnits(balance, "ether"));
		});
		}
	}, [account, library]);

	useEffect(() => {
		const connectorId = localStorage.getItem("connectorId");
		const accountAddress = localStorage.getItem("accountAddress");
		if (connectorId) {
		activate(injected);
		} else if (accountAddress) {
		activate(injected, undefined, true);
		}
	}, [activate]);

	useEffect(() => {
		window.ethereum.on("accountsChanged", handleAccountsChanged);
		return () => {
			window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
		};
	}, [account]);

	const handleAccountsChanged = (accounts) => {
		if (accounts.length === 0) {
			console.log("no account connected");
			localStorage.removeItem("connectorId");
		}
	};

	const handleConnect = (connector) => {
		activate(connector);
		localStorage.setItem("connectorId", connector);
	};

	return (
		<div className={styles.header}>
			<div className={styles.nav}>
				<Link
				to="/"
				className={
					splitLocation[1] === "" ? styles.linkActive : styles.navItem
				}
				>
					<span>Home</span>
				</Link>
				<Link
				to="/generate"
				className={
					splitLocation[1] === "generate" ? styles.linkActive : styles.navItem
				}
				>
					<span>Generate</span>
				</Link>
				<Link
					to="/verify"
					className={
						splitLocation[1] === "verify" ? styles.linkActive : styles.navItem
					}
				>
					<span>Verify</span>
				</Link>
				<Link
					to="/certificates"
					className={
						splitLocation[1] === "certificates" ? styles.linkActive : styles.navItem
					}
				>
					<span>Certificate</span>
				</Link>
				{
					user
					&&
					user.role === "institution"
					&&
					<Link
						to="/management"
						className={
							splitLocation[1] === "management" ? styles.linkActive : styles.navItem
						}
					> 
						<span>Management</span>
					</Link>
				}

				<Link
					to="/request"
					className={
						splitLocation[1] === "request" ? styles.linkActive : styles.navItem
					}
				>
					<span>Request</span>
				</Link>	

			</div>

			<div className = {styles.user}>	
				{
					!user
					?
					<div className={styles.authAction}>
						<Link to = "/register">
							<div className={styles.action}>
								Register
							</div>
						</Link>
						<Link to = "/login">
							<div className={styles.action}>
								Sign in
							</div>
						</Link>
					</div>
					:
					<>
						{account && chainId ? (
						 	<div className={styles.info}>
						 		<span className={styles.account}>{truncateEthAddress(account)}</span>
		
						 		<span className={styles.balance}>
						 			{Number.parseFloat(balance).toFixed(8)}
						 		</span>
						 	</div>
						) : (
						 	<Button
							theme="primary"
							type="button"
							text="Connect MetaMask"
							onClick={() => handleConnect(injected)}
							/>
						)}
					
						<div className = {styles.avatar}>
							<Avatar user = {user}/>
						</div>
						
						<div className={styles.out} onClick={() => {
							dispatch(logout())
						}}>
							<LogoutIcon />
							<span>Log out</span>          
						</div>
					</>


				}
			</div>

		</div>
	);
};

export default Header;
