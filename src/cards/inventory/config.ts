import { LoggerFactory } from "../../utilities/logger-factory";
import { Constants } from "../constants";
import { inventoryCardHtml } from "./inventory-card-html";
import { InventoryCardInstance } from "./inventory-card-instance";

export default (loggerFactory: LoggerFactory) => ({
	id: Constants.Inventory.ID,
	title: "Inventory",
	order: 10,
	icon: {
        url: "https://www.relativity.com/relativity/images/footer-logo-2x.png"
    },
	singleton: true,
	location: {
		layoutId: "viewerdock",
		paneId: "ri-viewer-bottom-dock",
		dockIndex: 0,
	},
	loader: {
		custom: {
			loadCard: (card, target) => {
				target.innerHTML = inventoryCardHtml;
				return Promise.resolve();
			},
			unloadCard: (card, target) => {
				return Promise.resolve();
			},
		}
    },
    createInstance: function (card) { return new InventoryCardInstance(loggerFactory, card); },
});