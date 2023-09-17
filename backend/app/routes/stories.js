import express from 'express';
import { isLoggedIn } from '../middleware/authorization/isLoggedIn.js';
import getStoriesOfFollowings from '../controllers/stories/getStoriesOfFollowings.js';
import validateUpdateStory from '../controllers/stories/validators/validateUpdateStory.js';
import verifyUserForStory from '../middleware/authorization/verifyUserForStory.js';
import updateStory from '../controllers/stories/updateStory.js';
import deleteStory from '../controllers/stories/deleteStory.js';
import viewStory from '../controllers/stories/viewStory.js';
import createStory from '../controllers/stories/createStory.js';
import validateCreateStory from '../controllers/stories/validators/validateCreateStory.js';
import validateGetDeleteViewStoies from '../controllers/stories/validators/validateGetDeleteViewStoies.js';
import getStoryById from '../controllers/stories/getStoryById.js';
import getMyStory from '../controllers/stories/getMyStory.js';

const StoryRouter = express.Router();

StoryRouter.post("/",
    validateCreateStory,
    isLoggedIn,
    createStory,
);

StoryRouter.get("/",
    isLoggedIn,
    getMyStory,
);

StoryRouter.get("/all",
    isLoggedIn,
    getStoriesOfFollowings
);

StoryRouter.get("/each/:id",
    validateGetDeleteViewStoies,
    isLoggedIn,
    getStoryById
);


StoryRouter.patch("/update/:id",
    validateUpdateStory,
    isLoggedIn,
    verifyUserForStory,
    updateStory

);

StoryRouter.delete("/delete/:id",
    validateGetDeleteViewStoies,
    isLoggedIn,
    verifyUserForStory,
    deleteStory
);

StoryRouter.patch("/view/:id" , 
    validateGetDeleteViewStoies,
    isLoggedIn,
    viewStory
)

export default StoryRouter;