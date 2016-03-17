require("../../dom");
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var SurveyEditor = require("../../../components/builder/SurveyEditor.jsx");
var expect = require("chai").expect;
var sinon = require("sinon");
var mocks = require("../../mocks");
var reg = require("../../../util/registry");
var Dispatcher = require("../../../util/Dispatcher");
var DragStore = require("../../../stores/DragStore");
var addCids = require("../../../util").addCids;

describe("SurveyEditor", function() {

    before(function() {
        reg.set("dispatcher", new Dispatcher());
        reg.set("dragStore", new DragStore());
    });

    it("can add a survey with two joiners", function() {
        var survey = addCids(mocks.getMockSurveyBasic());
        var editor = TestUtils.renderIntoDocument(<SurveyEditor survey={survey} activeJoiners={{}} />); 
        
        var joinerEditors = editor.getDOMNode().querySelectorAll(".joiner-editor");
        expect(joinerEditors.length).to.equal(2);
        expect(joinerEditors[0].id).to.equal("joiner-editor-qj1");       
        expect(joinerEditors[1].id).to.equal("joiner-editor-qj2");   
    });

    it("can add a survey with a joiner inside of a container", function() {
        var survey = { id: null, joiners: [] };
        var joiner = mocks.getMockJoiner(0);
        joiner.features.push({ type: "MemberOf", containerCid: "qc1" });
        var concept = { id: "qc1", displayIndex: 0, features: [] };
        concept.features.push({ type: "Container" });    
        survey.joiners.push(joiner);
        survey.joiners.push(concept);
        addCids(survey);
        var editor = TestUtils.renderIntoDocument(<SurveyEditor survey={survey} activeJoiners={{}} />); 
        
        var root = editor.getDOMNode().querySelector("#concept-editor-qc1");
        expect(root).to.exist;
        expect(root.querySelector("#joiner-editor-qj0")).to.exist;   
    });

});
