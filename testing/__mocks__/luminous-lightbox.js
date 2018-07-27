module.exports.Luminous = jest.fn(function() {
    this.destroy = jest.fn();
});
module.exports.LuminousGallery = jest.fn(function() {
    this.luminousInstances = [new module.exports.Luminous];
    this.destroy = jest.fn();
});
