import { Constants } from "./constants";
import { LoggerFactory } from "../utilities/logger-factory";
import getInventoryCardConfig from "./inventory/config";
import getCharacterCardConfig from "./character/config";

export const getCardDefinitions = (loggerFactory: LoggerFactory) => [
	getInventoryCardConfig(loggerFactory),
	getCharacterCardConfig(loggerFactory)

];

export const CardConstants = Constants;