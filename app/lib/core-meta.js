/**
 *
 */

const Meta = {

    /**
     * addMetadata
     * @param metaType string
     * @param objectId string
     * @param metaKey string
     * @param metaValue mixed
     * @param unique bool
     */
    addMetadata: function( metaType, objectId, metaKey, metaValue, unique ) {

    },

    /**
     * getMetadata
     * @param metaType string
     * @param objectId string
     * @param metaKey string
     * @param single bool
     */
    getMetadata: function( metaType, objectId, metaKey, single ) {

    },

    /**
     * updateMetadata
     * @param metaType string
     * @param objectId string
     * @param metaKey string
     * @param metaValue string
     */
    updateMetadata: function ( metaType, objectId, metaKey, metaValue ) {

    },

    /**
     * deleteMetadata
     * @param metaType string
     * @param objectId string
     */
    deleteMetadata: function ( metaType, objectId ) {

    }

};

module.exports = {
    addMetadata: Meta.addMetadata,
    getMetadata: Meta.getMetadata,
    updateMetadata: Meta.updateMetadata,
    deleteMetadata: Meta.deleteMetadata,
};