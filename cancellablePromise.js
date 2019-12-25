class CancellablePromise extends Promise {
  constructor(execute) {
    super((resolve, reject) =>
      execute(
        val => !this.cancelled ? resolve('val') : resolve('cancelled'),
        err => !this.cancelled ? reject('err') : reject('cancelled')
      ));
    this.cancelled = false;
    this.cancel = () => (this.cancelled = true);
  }
}

const cPromise = (time = 0) => new CancellablePromise(r => setTimeout(r, time));

const withResolve = cPromise();

const withCancel = cPromise();
withCancel.cancel();

withResolve.then(console.log)
withCancel.then(console.log)
