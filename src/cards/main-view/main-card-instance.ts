import { Constants } from "../constants";
import { Logger } from "loglevel";

export class MainCardInstance {

	private _logger: Logger;
	private _card;

	private _loaded: boolean;
	constructor(loggerFactory, card) {
		this._loaded = false;
		this._logger = loggerFactory.create("CharacterCardInstance")
		this._card = card;
	}

	public async cardLoaded(api, card): Promise<void> {
		this._logger.info("loaded");
		this._loaded = true;
	}
}