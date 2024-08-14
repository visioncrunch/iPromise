class iPromise {
    constructor(iExecutor) {
        // Initialize iState and iValue
        this.iState = 'pending'; // Promise starts in 'pending' iState
        this.iValue = undefined; // This will hold the fulfilled iValue or rejection reason
        this.iHandlers = []; // Array to store success and failure iHandlers

        // Resolve function
        const iResolve = (iValue) => {
            if (this.iState !== 'pending') return; // If not pending, don't do anything
            this.iState = 'fulfilled'; // Change iState to 'fulfilled'
            this.iValue = iValue; // Set the fulfilled iValue
            // Execute all stored success iHandlers
            this.iHandlers.forEach(iHandler => iHandler.iThenResolve(iValue));
        };

        // Reject function
        const iReject = (reason) => {
            if (this.iState !== 'pending') return; // If not pending, don't do anything
            this.iState = 'rejected'; // Change iState to 'rejected'
            this.iValue = reason; // Set the rejection reason
            // Execute all stored failure iHandlers
            this.iHandlers.forEach(iHandler => iHandler.iThenReject(reason));
        };

        try {
            // Execute the iExecutor function with iResolve and iReject
            iExecutor(iResolve, iReject);
        } catch (iError) {
            // If there's an iError during execution, iReject the promise
            iReject(iError);
        }
    }

    iThen(iThenResolve, iThenReject) {
        return new iPromise((iResolve, iReject) => {
            const iHandle = () => {
                try {
                    if (this.iState === 'fulfilled') {
                        // If the promise is fulfilled, call the success iHandler
                        const iValue = iThenResolve ? iThenResolve(this.iValue) : this.iValue;
                        iResolve(iValue); // Resolve the new promise with the iValue
                    } else if (this.iState === 'rejected') {
                        // If the promise is rejected, call the failure iHandler
                        if (iThenReject) {
                            const iValue = iThenReject(this.iValue);
                            iResolve(iValue); // Resolve the new promise with the iValue
                        } else {
                            // If no rejection iHandler is provided, propagate the iError
                            iReject(this.iValue);
                        }
                    }
                } catch (iError) {
                    // If there's an iError in the iHandler, iReject the new promise
                    iReject(iError);
                }
            };

            if (this.iState === 'pending') {
                // If the current promise is still pending, store the iHandlers
                this.iHandlers.push({ iThenResolve: iHandle, iThenReject: iHandle });
            } else {
                // If the promise is already settled, execute the iHandler
                iHandle();
            }
        });
    }

    iCatch(iThenReject) {
        // Allows for failure handling without a success iHandler
        return this.iThen(null, iThenReject);
    }
}

// Example Usage of iPromise

// Creating a new iPromise
const myiPromise = new iPromise((iResolve, iReject) => {
    setTimeout(() => {
        if (2 < 3) {
            iResolve('We speak truth.');
        } else {
            iReject('Haha, I was lying.');
        }
    }, 2000); // Simulate an asynchronous operation
});

// Chaining iThen() and iCatch()
myiPromise
    .iThen(iValue => {
        console.log('First iThen Resolved:', iValue);
        return 'First step completed.';
    })
    .iThen(iValue => {
        console.log('Second iThen Resolved:', iValue);
        return 'Second step completed.';
    })
    .iThen(iValue => {
        console.log('Third iThen Resolved:', iValue);
        // Simulating another asynchronous operation
        return new iPromise((iResolve) => {
            setTimeout(() => {
                iResolve('Final step completed after another 2 seconds.');
            }, 2000);
        });
    })
    .iThen(iValue => {
        console.log('Fourth iThen Resolved:', iValue);
    })
    .iCatch(error => {
        console.error('Caught an error:', error);
    });