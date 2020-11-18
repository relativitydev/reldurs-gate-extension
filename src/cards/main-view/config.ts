import { LoggerFactory } from "../../utilities/logger-factory";
import { Constants } from "../constants";
import { MainCardInstance } from "./main-card-instance";

export default (loggerFactory: LoggerFactory) => ({
	id: Constants.Main.ID,
	title: "Character",
	order: 10,
	icon: {
        url: "https://www.relativity.com/relativity/images/footer-logo-2x.png"
    },
	singleton: true,
	location: {
        layoutId: "review",
        paneId: "ri-review-left-accordion",
		dockIndex: 0,
    },
	loader: {
        iframe: {
            url: top.window.origin + "/Relativity/CustomPages/71c26786-a8b8-4514-bd16-3ef92fca76da/default.aspx"
        }
    },
    createInstance: function (card) { return new MainCardInstance(loggerFactory, card); },
});