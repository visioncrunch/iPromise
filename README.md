# iPromise

Welcome to the **iPromise** project! This repository contains my custom implementation of JavaScript's Promise, named `iPromise`. 

## Cloning the Repository

To get started, clone the repository using the following command:

```bash
git clone https://github.com/visioncrunch/iPromise.git
```

## Understanding iPromise.js

The core of this project lies in the `iPromise.js` file. This is where I've developed my own version of the Promise class, with the intention of better understanding the underlying mechanics of asynchronous programming.

### Current Status

As of now, the `iPromise` implementation supports basic functionalities, including:

- **Pending, Fulfilled, and Rejected States:** The promise starts in a 'pending' state and transitions to either 'fulfilled' or 'rejected'.
- **.then() Method:** This method allows for chaining of operations upon successful resolution or rejection of the promise.
- **.catch() Method:** This method provides a way to handle rejections without specifying a success handler.

However, there are some features still in development:

- **.finally() Method:** This feature is not yet implemented. It will allow a handler to be executed regardless of the promise's outcome, providing a cleaner way to perform cleanup tasks.

### Milestone Achieved

One significant milestone I've achieved is cracking the concept of handlers. This has been a challenge for me for quite some time. After exploring various tutorials and resources, I finally understood how handlers operate within a promise. I would like to share an explanation I found particularly helpful.

### Handlers Explained

Handlers are functions that are executed when a promise transitions from the 'pending' state to either 'fulfilled' or 'rejected'. They are stored in an array (`this.iHandlers`) and are essential for managing the asynchronous behavior of promises. Here’s a breakdown of how handlers work in the `iPromise` implementation:

- **Storing Handlers:** If the promise is still pending, handlers are stored and executed once the promise is settled.
- **Executing Handlers:** When the promise is fulfilled or rejected, the corresponding handlers are executed, allowing you to define what should happen in each scenario.

For more details, refer to the in-depth explanations included in the code comments and documentation within the `iPromise.js` file.

## Future Improvements

As I continue to learn more about promises and asynchronous programming, I plan to refine and expand the functionality of `iPromise`. The inclusion of the `.finally()` method is on the horizon, and I am excited to see how this project evolves.

## Acknowledgments

I want to thank my friend for encouraging me to explore different AI tools, such as Perplexity and Claude, which provided helpful explanations and insights into promises and their handlers.

---

Feel free to reach out if you have any questions or suggestions for improvement!

---
