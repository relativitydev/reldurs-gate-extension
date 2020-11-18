import { Constants } from "./constants";
import { LoggerFactory } from "../utilities/logger-factory";
import getInventoryCardConfig from "./inventory/config";
import getMainCardConfig from "./main-view/config";

export const getCardDefinitions = (loggerFactory: LoggerFactory) => [
	getInventoryCardConfig(loggerFactory),
	getMainCardConfig(loggerFactory)
];

export const CardConstants = Constants;