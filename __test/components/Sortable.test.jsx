require("../dom");
var _ = require("lodash");
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var Sortable = require("../../components/Sortable.jsx");
var SortableItem = require("../../mixins/SortableItem.js");
var expect = require("chai").expect;
var sinon = require("sinon");
var Dispatcher = require("../../util/Dispatcher");
var DragStore = require("../../stores/DragStore");
var DragActions = require("../../actions/DragActions");
var reg = require("../../util/registry");

describe("Sortable", function() {

    var ItemComponent = React.createClass({  
    
        mixins: [SortableItem],
    
        render() {                   
            var style = {
                position: "absolute",
                top: this.props.top,
                left: 0,
                height: 10,
                width: 100
            };
        
            return (
                <div style={style} className={this.props.foo}>{this.props.children}</div>    
            );
        }
    });

    var ContainerComponent = React.createClass({  
    
        accepts(props) {
            return props.foo;
        },
    
        render() {
            // Sortable doesn't actually take a style, this is just used by the getBoundingClientRect hack!
            var style = {
                position: "absolute",
                top: 0,
                left: 0,
                height: 100,
                width: 100
            };
        
            return (
                <Sortable style={style} containerKey="c1" accepts={this.accepts}>
                    <ItemComponent key="i1" itemKey="i1" containerKey="c1" top={10} foo="bar">bar</ItemComponent>
                    <ItemComponent key="i2" itemKey="i2" containerKey="c1" top={50} foo="abc">abc</ItemComponent>        
                </Sortable>    
            );
        }
    });
    
    before(function() {
        this.dispatcher = new Dispatcher();
        reg.set("dispatcher", this.dispatcher);  
        this.dispatcher.register(new DragActions());   
        
        // HACK!
        // jsdom just implements this by returning zeros, so provide our own
        // test component specific implementation
        document.body.__proto__.__proto__.getBoundingClientRect = function() {
            return {
                top: parseInt(this.style.top),
                left: parseInt(this.style.left),
                width: parseInt(this.style.width),
                height: parseInt(this.style.height),
                bottom: parseInt(this.style.top) + parseInt(this.style.height),
                right: parseInt(this.style.left) + parseInt(this.style.width)
            };
        };
    });
    
    beforeEach(function() {
        this.dragStore = new DragStore();
        reg.set("dragStore", this.dragStore);
        this.dispatcher.register(this.dragStore);
    });
    
    afterEach(function() {
        React.unmountComponentAtNode(document.body);
    });

    it("dragging over a sortable item inserts a placeholder", function() { 
        var container = React.render(<ContainerComponent />, document.body);      
        this.dragStore.addDraggable({ itemKey: "d1", dragProps: { foo: "cat" }});        
        this.dragStore.startDrag({});            
        this.dragStore.drag({ x: 50, y: 12 });
        expect(getAllClassNames(".sortable-container", "div")).to.deep.equal(["sort-placeholder", "bar", "abc"]);
    });
    
    it("dragging outside of the sortable does not insert a placeholder", function() { 
        var container = React.render(<ContainerComponent />, document.body);      
        this.dragStore.addDraggable({ itemKey: "d1", dragProps: { foo: "cat" }});        
        this.dragStore.startDrag({});            
        this.dragStore.drag({ x: 50, y: 110 });
        expect(getAllClassNames(".sortable-container", "div")).to.deep.equal(["bar", "abc"]);
    });
    
    it("dragging into and out of a sortable removes the placeholder", function() { 
        var container = React.render(<ContainerComponent />, document.body);      
        this.dragStore.addDraggable({ itemKey: "d1", dragProps: { foo: "cat" }});        
        this.dragStore.startDrag({});            
        this.dragStore.drag({ x: 50, y: 12 });  
        this.dragStore.drag({ x: 50, y: 110 });
        expect(getAllClassNames(".sortable-container", "div")).to.deep.equal(["bar", "abc"]);
    });
    
    it("dragging one of the sortable's own items removes it during the drag", function() { 
        var container = React.render(<ContainerComponent />, document.body);   
        // Draggables and SortableItems are compared by itemKey       
        this.dragStore.addDraggable({ itemKey: "i1", dragProps: { foo: "cat" }}); 
        this.dragStore.startDrag({});            
        this.dragStore.drag({ x: 50, y: 56 });
        expect(getAllClassNames(".sortable-container", "div")).to.deep.equal(["abc", "sort-placeholder"]);
        this.dragStore.stopDrag({});
        expect(getAllClassNames(".sortable-container", "div")).to.deep.equal(["bar", "abc"]);
    });

    function getAllClassNames(parentSelector, selector) {
        return _.pluck(document.querySelector(parentSelector).querySelectorAll(selector), "className");
    }
});
