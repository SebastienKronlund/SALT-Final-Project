import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "./splash.css";
import Context from "../../contexts/UserContext.js";

import Background from "../static/Background";
import Header from "../static/Header";
import Footer from "../static/Footer";

import SchedulePreview from "../SchedulePlanner/SchedulePreview";

import bxMessageDetail from "@iconify/icons-bx/bx-message-detail";
import bxMessageCheck from "@iconify/icons-bx/bx-message-check";
import { Icon } from "@iconify/react";

const Splash = () => {
	const history = useHistory();

	const userInfo = useContext(Context).userInfo;
	const usersContacts = userInfo.messages;
	const contactsArr = Object.getOwnPropertyNames(usersContacts);

	const redirectToSchedule = () => {
		history.push("/schedule-planner");
	};

	return (
		<>
			<Header />
			<Background />
			<main className="splash-page">
				<p className="splash-greeting">
					Hello {userInfo.firstName} {userInfo.lastName}
				</p>
				<section className="splash-content-area">
					<div className="inbox splash-content-container">
						<h4 className="container-inner-title align-mid text-border-bottom">Inbox</h4>
						<div className="inbox-message-area">
							{contactsArr.map((contact, i) => {
								try {
									const latestReceived = usersContacts[contact].messages[0];
									return (
										<div className="message-container" key={i}>
											<div className="message-icon-and-contact">
												<Icon
													icon={
														latestReceived
															? latestReceived.read
																? bxMessageCheck
																: bxMessageDetail
															: null
													}
													style={
														latestReceived
															? latestReceived.read
																? { color: "#17A744", fontSize: "24px" }
																: { color: "#00B3D3", fontSize: "24px" }
															: null
													}
												/>
												<p className="contact">{`${usersContacts[contact].firstName} ${usersContacts[contact].lastName}`}</p>
											</div>
											<div className="message-text-container">
												<p className="message-text">
													{latestReceived ? latestReceived.message : null}
												</p>
											</div>
										</div>
									);
								} catch {
									console.log("Oh no");
								}
							})}
						</div>
						<Link className="splash-content-link" to="/chat">
							<p>View all your messages</p>
						</Link>
					</div>

					<div className="appointments-splash splash-content-container">
						<h4 className="container-inner-title align-mid text-border-bottom">Appointments</h4>
						<div className="appointments-entries-area">
							<div className="appointment-splash">
								<p className="appointment-splash-title">Quarterly check-up | St. Adams Hospital</p>
								<p className="appointment-splash-date">15:th of August at 14:30</p>
								<p className="appointment-splash-description">
									this is really just filler text, nothing to see here folks, go on about your daily
									struggle come on now stop reading i mean it stop please.
								</p>
							</div>
							<div className="appointment-splash">
								<p className="appointment-splash-title">Bloodtest results | St. Adams Hospital</p>
								<p className="appointment-splash-date">21:th of January at 14:30</p>
								<p className="appointment-splash-description">
									this is really just filler text, nothing to see here folks, go on about your daily
									struggle come on now stop reading i mean it stop please.
								</p>
							</div>
						</div>
						<Link className="splash-content-link" to="/appointments">
							<p>See all your appointments</p>
						</Link>
					</div>

					<div className="recommendations splash-content-container">
						<h4 className="container-inner-title align-mid text-border-bottom">Recommendations</h4>
						<div className="all-recommendations">
							<div className="recommendation">
								<p>We see that you haven't yet gotten tested for Covid.</p>
								<a
									href="https://www.1177.se/Stockholm/sjukdomar--besvar/lungor-och-luftvagar/inflammation-och-infektion-ilungor-och-luftror/om-covid-19--coronavirus/lamna-prov-och-fa-provsvar-om-covid-19/lamna-prov-for-covid-19/"
									target="_blank"
									className="inner-splash-content-link"
									to="/home">
									<p>Click here to find your nearest test hub</p>
								</a>
							</div>
							<div className="recommendation">
								<p>It has been 287 days since you last dentist appointment.</p>
								<Link className="inner-splash-content-link" to="/appointments">
									<p>Click here to book an appointment</p>
								</Link>
							</div>
						</div>
					</div>
					<SchedulePreview />
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Splash;
