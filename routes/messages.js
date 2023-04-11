'use strict';

const Message = require('../models/message');
const { authenticateJWT, ensureLoggedIn } = require('../middleware/auth');
const { UnauthorizedError } = require('../expressError');

const Router = require('express').Router;
const router = new Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Makes sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', ensureLoggedIn, async function (req, res, next) {

  const username = res.locals.user.username;

  try {
		const message = await Message.get(req.params.id);
    if(username === message.from_user.username || username === message.to_user.username){
      return res.json({ message });
    } else {
      throw new UnauthorizedError("Halt there");
    }
	} catch (error) {
		console.warn(error);

	}
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', ensureLoggedIn,  async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();

  const { to_username, body } = req.body;
  const from_username = res.locals.user.username;
  const message = await Message.create({from_username, to_username, body});

  return res.json( {message} );
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Makes sure that only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', async function (req, res, next) {

  const id = req.params.id
  const fullMsg = await Message.get(id)
  const to_username = res.locals.user.username;

  try{
    if(to_username === fullMsg.to_user.username){
      const message = await Message.markRead(id)
      return res.json({ message })
    }
  } catch(err) {
    throw new UnauthorizedError(`You're not allow to do this action.`);
  }

});

module.exports = router;

