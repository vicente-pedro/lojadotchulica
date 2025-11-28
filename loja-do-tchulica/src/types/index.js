
/**
 * @typedef {'smartphone' | 'acessorio'} ProductCategory
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {ProductCategory} category
 * @property {string} [brand]
 * @property {number} price
 * @property {string} image
 * @property {string} description
 * @property {number} stock
 * @property {string[]} [colors]
 */

/**
 * @typedef {Product & { quantity: number, selectedColor?: string }} CartItem
 */

/**
 * @callback AddToCart
 * @param {Product} product
 * @param {string} [selectedColor]
 */

/**
 * @callback RemoveFromCart
 * @param {number} productId
 * @param {string} [selectedColor]
 */

/**
 * @callback UpdateQuantity
 * @param {number} productId
 * @param {number} quantity
 * @param {string} [selectedColor]
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} cart
 * @property {AddToCart} addToCart
 * @property {RemoveFromCart} removeFromCart
 * @property {UpdateQuantity} updateQuantity
 * @property {() => void} clearCart
 * @property {() => number} getTotalPrice
 * @property {() => number} getTotalItems
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {'user' | 'admin'} role
 */

/**
 * @callback LoginFn
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */

/**
 * @callback RegisterFn
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {LoginFn} login
 * @property {RegisterFn} register
 * @property {() => void} logout
 * @property {boolean} isAuthenticated
 * @property {boolean} isAdmin
 */

export {};
