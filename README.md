# Mastering Nuxt 3 in Typescript

This is my version of the [Mastering Nuxt 3 Course](https://https://masteringnuxt.com/) project.

The project is a video course site where you can purchase a course and login with your github account or you can watch the first chapter for free.

I'm

Instead of following along with the course repo, I created a new project. All packages are updated to the latest as of May 2023, including Typescript 5.04 and a few extra types packages. I also pulled in and used the node packages for Stripe client and server side instead of using the script tag.

I encountered several TS errors. Some were seen on video in the course but not mentioned by the instructor and apparently did not cause runtime errors for him. Some errors don't show up until you add lang="ts" to the script tag. Being new to Nuxt and a TS amatuer at best, I wanted to maximize the learning on both subjects, so I insisted on a couple of rules up front.

TS rules:

1. No component or file goes unchecked (all components get the lang="ts" attribute)
2. No TS error gets ignored (red squigglies are evil and must be eradicated from the code base)
3. No "as" Use runtime type guards and assertions (need some refactoring but it works)

Component rules:

1. Script tags go at the top (Just my preference. Most errors seem to start here)
2. If props, define a Props type or interface (Still thinking on this)

Changes I plan on making over the next few weeks:
Code first

1. Need to work on type guards and assertions (some incorrectly used or might be redundant)
2. Refactors and fixes for any duplicate, messy or confusing code.
3. Make sure formatting and code style follows a standard throughout the code base
4. Do something with the "/" page or get rid of it and put a signin on the landing page
5. Redo layout and style on the course page. It's not terrible but compared to landing page it's ugly.
6. Implement dark and light mode themes
7. Make all layouts responsive. The current site has zero responsivness but it wasn't about learning to build reponsive pages.
8. Provide Netlify and Supabase instructions and make this whole project a little more generic.
