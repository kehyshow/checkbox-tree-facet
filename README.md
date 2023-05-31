# Checkbox Tree Facet Component using React

## Overview

This project is a checkbox tree facet component built using React. It's designed to display a tree of checkboxes with name and quantities of the brand category, allowing users to quickly refine their options without losing their way or scrolling through irrelevant products.

## Installation

To install the project, simply run `yarn install` to install the required packages.

## How to run

To run the application, simply run `yarn start` and open the web browser and nagivate to `http://localhost:3000` to see the running app.

## Structure

* **App.tsx** - This is the entry point of the application. It renders the Tree component.
* **./components/Tree/Tree.tsx** - This is the top-level component and contains the state of the component and handles the selected values.
* **./components/CheckboxList/CheckboxList.tsx** - This component is used to display the checkboxes and their corresponding labels.
* **./components/Checkbox/Checkbox.tsx** - This component renders a single checkbox.
* **./components/Tree/updateItemStates.ts** - This is a helper function to update the state of checkboxes recursively.

## Features

* Renders checkboxes in a tree structure.
* Displays only the parent category checkboxes on the initial load.
* Clicking on a parent category expands and shows the children checkboxes.
* Selected categories are displayed separately above the checkbox list.
* Provides an option to remove all selected categories.
* Allows selecting all checkboxes under a chosen category.

## Bonus Features

* The UI components are designed to be reusable and can be used in other React projects.
* The UI is designed to be slick and concise and visually appealing.
* The code includes basic testing.

## Screenshot

You can see the `Screenshot.png`file in the root directory.

## Libraries/Frameworks Used

* React v18.2.0
* Typescript v4.9.5
* Sass v1.32.5
* Classnames v2.2.6
* React-Icons v4.9.0