  
import { Logger } from "loglevel";
import { getCardDefinitions, CardConstants } from "./cards";
import { Configuration } from "./configuration";
import { LoggerFactory } from "./utilities/logger-factory";

export class SampleExtension {
	private _extensionParameters;
	private _loggerFactory: LoggerFactory;
	private _configuration: Configuration;

	private _logger: Logger;
	private _cardDefinitions;

	/**
	 * Creates an instance of SampleExtension.
	 * @param {*} extensionParameters Review extension parameters
	 * @param {Configuration} configuration Configuration
	 * @param {LoggerFactory} loggerFactory Logger factory
	 */
	constructor(extensionParameters, configuration: Configuration, loggerFactory: LoggerFactory) {
		this._extensionParameters = extensionParameters;
		this._configuration = configuration;
		this._loggerFactory = loggerFactory;
		this._logger = loggerFactory.create("Extension");
		this._cardDefinitions = getCardDefinitions(this._loggerFactory);
	}

	/**
	 * The globally unique ID for the extension
	 */
	public get id(): string {
		return "relativity.rogue.extension";
	}

	/**
	 * User-friendly name for the extension
	 */
	public get name(): string {
		return "Relativity Rogue Extension";
	}

	/**
	 * Registered cards
	 */
	public get cards(): any[] {
		/* When using a getter to define an extension's cards, it's important to return the same reference each time it is called.
		 * If the reference differs from call to call, certain extension features may not function as expected -- for example, 
		 * loading resource files from within cards won't work correctly.
		 */
		return this._cardDefinitions;
	}

	/**
	 * Lifecycle event handlers
	 */
	public get lifecycle() {
		return {
			apiready: (api): void => {

			},
			ready: (api): void => {
				this._createCards(api);
			},
			activated: (api): void => {

			},
			deactivated: (api): void => {

			},
			teardown: (api): void => {

			}
		};
	}

	/**
	 * Creates instances of any necessary cards
	 * @param {*} api Review API
	 */
	private _createCards(api): void {
		try {
			this._logger.info(`Creating ${this.name} cards...`);
			api.cards.createCard(CardConstants.Inventory.ID, undefined, api.viewer.mainCollection);
			api.cards.createCard(CardConstants.Character.ID);
		} catch (e) {
			this._logger.error(`Failed to create ${this.name} cards. ${e.message}`);
			throw e;
		}
	}
}