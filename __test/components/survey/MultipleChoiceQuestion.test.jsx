require("../../dom");
var expect = require("chai").expect;
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var MultipleChoiceQuestion = require("../../../components/survey/MultipleChoiceQuestion.jsx");
var sinon = require("sinon");

describe("MultipleChoiceQuestion", function() {

    it("state should only includes most recent selected radio button", function() {
        var multipleChoiceQuestion = TestUtils.renderIntoDocument(
            <MultipleChoiceQuestion 
                cid="q1" 
                question={{
                    prompt:"Foo?" 
                }}
                responseSet={{
                    type: "SingleResponseSet",
                    allowMultipleAnswers: false, 
                    choices: [{ index: "c1", value: { value: "Bar!" }}, { index: "c2", value: { value: "Blah." }}]
                }}
            />
        );
        
        var input1 = multipleChoiceQuestion.getDOMNode().querySelector("#SingleResponseSet-q1-c1");
        TestUtils.Simulate.change(input1);
        
        var input2 = multipleChoiceQuestion.getDOMNode().querySelector("#SingleResponseSet-q1-c2");
        TestUtils.Simulate.change(input2);
        
        expect(multipleChoiceQuestion.state).to.deep.equal({ c2: true });
    });
    
    it("state should include all selected checkboxes", function() {    
        var multipleChoiceQuestion = TestUtils.renderIntoDocument(
            <MultipleChoiceQuestion 
                cid="q1" 
                question={{
                    prompt:"Foo?" 
                }}
                responseSet={{
                    type: "SingleResponseSet",
                    allowMultipleAnswers: true,
                    choices: [{ index: "c1", value: { value: "Bar!" }}, { index: "c2", value: { value: "Blah." }}]
                }}
            />
        );
        
        var input1 = multipleChoiceQuestion.getDOMNode().querySelector("#SingleResponseSet-q1-c1");
        TestUtils.Simulate.change(input1);
        
        var input2 = multipleChoiceQuestion.getDOMNode().querySelector("#SingleResponseSet-q1-c2");
        TestUtils.Simulate.change(input2);
        
        expect(multipleChoiceQuestion.state).to.deep.equal({ c1: true, c2: true });
    });
    
});
