/**
 * Tiled Types taken from:
 * check out {@link https://github.com/eXponenta/pixi-tiled/blob/master/src/ITiledMap.ts}
 */

/**
 * @typedef {"float" | "int" | "color" | "bool" | "string"} IPropType
 */

/**
 * @typedef {"tilelayer" | "objectgroup" | "imagelayer" | "group"} ILayerType
 */

/**
 * @typedef {{[key: string]: string | number | boolean}} IParsedProps
 */

/**
 * @typedef {object} IPropDefinition
 * @property {string} name
 * @property {IPropType} type
 * @property {string | number | boolean} value
 */

/**
 * @typedef {object} ITiledFrame
 * @property {number} tileid
 * @property {number} duration
 */

/**
 * @typedef {object} ITiledTile
 * @property {ITiledFrame[]} [ animation ]
 * @property {number} id
 * @property {string} [ image ]
 * @property {number} imageheight
 * @property {number} imagewidth
 * @property {ITiledLayer} objectgroup
 * @property {number} [ type ]
 * @property {IPropDefinition[]} properties
 * @property {IParsedProps} parsedProps
 */

/**
 * @typedef {object} ITiledTileset
 * @property {"tileset"} type
 * @property {string} name
 * @property {number} firstgrid
 * @property {*} [ grid ]
 * @property {string} image
 * @property {number} imageheight
 * @property {number} imagewidth
 * @property {number} [ margin ]
 * @property {number} [ spacing ]
 * @property {number} [ columns ]
 * @property {number} [ tilecount ]
 * @property {number} [ tileheight ]
 * @property {number} [ tilewidth ]
 * @property {TPoint} [ tileoffset ]
 * @property {ITiledTile[]} [ tiles ]
 * @property {IPropDefinition[]}  properties
 * @property {IParsedProps} parsedProps
 * @property {string} [ source ]
 */

/**
 * @typedef {object} ITiledBaseObject
 * @property {string} type
 * @property {string} name
 * @property {number} id
 * @property {number} height
 * @property {number} width
 * @property {number} x
 * @property {number} y
 * @property {boolean} visible
 * @property {IPropDefinition[]} properties
 * @property {IParsedProps} parsedProps
 */

/**
 * @typedef {object} ITiledText
 * @property {string} text
 * @property {boolean} [ wrap ] // false
 * @property {string} [ color ] // 0x0
 * @property {string} [ fontfamily ] // sans-serif
 * @property {number} [ pixelsize ] // 16
 * @property {boolean} [ kerning ] // true
 * @property {boolean} [ underline ] // false
 * @property {boolean} [ italic ] // false
 * @property {boolean} [ bold ] // false
 * @property {"center" | "right" | "justify" | "left"} [ halign ] // left
 * @property {"center" | "bottom" | "top"} [ valign ] // top
 */

/**
 * @typedef {object} ITiledObjectOnly
 * @property {number} grid
 * @property {number} rotation
 * @property {boolean} [ point ]
 * @property {boolean} [ ellipse ]
 * @property {TPoint[]} [ polygon ]
 * @property {TPoint[]} [ polyline ]
 * @property {ITiledText} [ text ]
 */

/**
 * @typedef {ITiledBaseObject & ITiledObjectOnly} ITiledObject
 */

/**
 * @typedef {object} ITiledSpriteOnly
 * @property {ITiledTile} [ image ]
 */

/**
 * @typedef {ITiledObject & ITiledSpriteOnly} ITiledSprite
 */

/**
 * @typedef {object} ITiledLayerOnly
 * @property {ILayerType} type
 * @property {number} offsetx
 * @property {number} offsety
 * @property {number} opacity
 */

/**
 * @typedef {ITiledBaseObject & ITiledLayerOnly} ITiledLayer
 */

/**
 * @typedef {object} ITiledTileLayerOnly
 * @property {"tilelayer"} type
 * @property {number[]} data
 */

/**
 * @typedef {ITiledLayer & ITiledTileLayerOnly} ITiledTileLayer
 */

/**
 * @typedef {object} ITiledObjectLayerOnly
 * @property {"objectgroup"} type
 * @property {"topdown" | "index"} draworder
 * @property {ITiledObject[]} objects
 */

/**
 * @typedef {ITiledLayer & ITiledObjectLayerOnly} ITiledObjectLayer
 */

/**
 * @typedef {object} ITiledImageLayerOnly
 * @property {"imagelayer"} type
 * @property {string} image
 */

/**
 * @typedef {ITiledLayer & ITiledImageLayerOnly} ITiledImageLayer
 */

/**
 * @typedef {object} ITiledGroupLayerOnly
 * @property {"group"} type
 * @property {ITiledLayer[]} layers
 */

/**
 * @typedef {ITiledLayer & ITiledGroupLayerOnly} ITiledGroupLayer
 */

/**
 * @typedef {object} ITiledMap
 * @property {"map"} type
 * @property {number} height // rows
 * @property {number} width // columns
 * @property {number} tileheight
 * @property {number} tilewidth
 * @property {string} [ backgroundcolor ]
 * @property {"orthogonal"} orientation
 * @property {IPropDefinition[]} properties
 * @property {IParsedProps} parsedProps
 * @property {"right-down"} [ renderorder ] // right-down
 * @property {boolean} [ infinite ]
 * @property {ITiledTileset[]} tilesets
 * @property {ITiledLayer[]} layers
 * @property {number} nextobjectid
 * @property {1} version
 * @property {string} tiledversion
 */

