import { Constants } from "../constants";
import { Logger } from "loglevel";

export class InventoryCardInstance {

	private _logger: Logger;
	private _card;

	private _loaded: boolean;
	private _viewerCollection;
	private _queuePointer;
	constructor(loggerFactory, card) {
		this._loaded = false;

		this._logger = loggerFactory.create("InventoryCardInstance")
		this._card = card;
		this._viewerCollection = card.parameters[0];
		this._queuePointer = this._viewerCollection.queuePointer;

		this._registerQueuePointerEventHandlers(this._queuePointer);
		this._registerViewerCollectionEventHandlers();
	}

	public async cardLoaded(api, card): Promise<void> {
		this._logger.info("loaded");
		this._loaded = true;

		const artifactId = this._getDocumentArtifactId();
	}

	/**
	 * Updates the background gradient of the card
	 * 
	 * @param {string} startHexCode Hex code for the gradient start color (i.e. "#fce3ec");
	 * @param {string} endHexCode Hex code for the gradient end color (i.e. "#ffe8cc");
	 */

	private _registerViewerCollectionEventHandlers(): void {
		this._viewerCollection.on("queuepointerchanged", this._handleQueuePointerChanged);
	}

	private _registerQueuePointerEventHandlers(queuePointer): void {
		queuePointer.on("updated", this._handleQueuePointerUpdate);
	}

	private _unregisterQueuePointerEventHandlers(queuePointer): void {
		queuePointer.off("updated", this._handleQueuePointerUpdate);
	}

	//#region Event Handlers

	private _handleQueuePointerUpdate = (event) => {
		const artifactId = this._getDocumentArtifactId();
	};

	private _handleQueuePointerChanged = (event) => {
		this._unregisterQueuePointerEventHandlers(event.oldPointer);
		this._registerQueuePointerEventHandlers(event.newPointer);
		this._queuePointer = event.newPointer;
	};

	//#endregion

	private _getDocumentArtifactId(): number {
		const queueItem = this._queuePointer.item;
		if (queueItem && queueItem.type === "document") {
			return queueItem.artifactId;
		} else {
			return -1;
		}
	}
}