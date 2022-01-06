(function () {
  "use strict";

  /**
   * test function
   * @param {string} desc
   * @param {function} fn
   */
  function it(desc, fn) {
    try {
      fn();
      console.log("\u2714 " + desc);
    } catch (error) {
      console.log("\u2718 " + desc);
      console.error(error);
    }
  }

  function assert(isTrue) {
    if (!isTrue) {
      throw new Error();
    }
  }

  function differentContents(a, b) {
    return a.length === b.length && a.some((word, i) => word !== b[i]);
  }

  it("should produce a string with two hyphens", function () {
    const roomCode = generateRoomCode();
    const hyphenCount = roomCode.match(
      new RegExp("\\b" + "-" + "\\b", "g")
    ).length;
    assert(hyphenCount == 2);
  });

  it("should produce a string containing three words between hyphens", function () {
    const roomCode = generateRoomCode();
    const wordCount = roomCode.match(new RegExp("\\w+", "g")).length;
    assert(wordCount == 3);
  });

  it("should produce at least some different words between two different room codes", function () {
    console.log("Please wait... this could take a while!");
    for (let i = 0; i < 1_000_000; i++) {
      const roomCode1 = generateRoomCode();
      const roomCodeWords1 = roomCode1.match(new RegExp("\\w+", "g"));
      const roomCode2 = generateRoomCode();
      const roomCodeWords2 = roomCode2.match(new RegExp("\\w+", "g"));
      assert(differentContents(roomCodeWords1, roomCodeWords2));
    }
  });
})();
