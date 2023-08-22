"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <button class="fav">&hearts;</button>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function submitNewStoryForm(event) {
  event.preventDefault();

  let author = $submitAuthor.val();
  let title = $submitTitle.val();
  let url = $submitUrl.val();
  let username = currentUser.username;

  //not mine
  let storyData = { title, url, author, username };
  let response = await storyList.addStory(currentUser, {
    title,
    author,
    url,
    username,
  });
  const $story = generateStoryMarkup(response);
  $allStoriesList.prepend($story);
}

$submitStoryBtn.on("click", submitNewStoryForm);




async function toggleFav(event) {
  const $target = $(event.target);
  const $nestedLi = $target.closest("li");
  const storyId = $nestedLi.attr("id");
  const story = storyList.stories.find(x => x.storyId === storyId)

  if ($target.hasClass())

}

// This adds a story to the favorites list when clicked

