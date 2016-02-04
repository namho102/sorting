export function bubbleSort() {
  var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i < this.length; i++) {
            if (this[i - 1] > this[i]) {
                done = false;
                // sleep(1000);
                [this[i - 1], this[i]] = [this[i], this[i - 1]];
                return this;
            }
        }
    }
    return this;
}
