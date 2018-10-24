import { Component, OnInit } from '@angular/core';
import * as go from "gojs";


@Component({
  selector: 'app-grafo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var $ = go.GraphObject.make;
    var myDiagram = $(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center,
        "undoManager.isEnabled": true,
        layout: $(go.TreeLayout, {
            angle: 0,
            layerSpacing: 50,
            nodeSpacing: 50,
            layerStyle: go.TreeLayout.LayerUniform,
            //treeStyle: go.TreeLayout.StyleLayered,
            alignment: go.TreeLayout.AlignmentEnd
        })
    });
    myDiagram.nodeTemplate = $(go.Node, "Auto", $(go.Shape, "RoundedRectangle", {
        fill: "black",
        portId: "",
        cursor: "pointer",
        stroke: "black",
        strokeWidth: 3,
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableSelfNode: true,
        toLinkableDuplicates: true
    }, new go.Binding("fill", "color")), $(go.TextBlock, "Default Text", {
        margin: 10,
        font: "bold 16px sans-serif",
        stroke: "white",
        isMultiline: false,
        editable: true
    }, new go.Binding("text", "name").makeTwoWay())
    //$("TreeExpanderButton")
    );
    myDiagram.linkTemplate = $(go.Link, {
        routing: go.Link.AvoidsNodes,
        corner: 10,
        relinkableFrom: true,
        relinkableTo: true,
        curve: go.Link.JumpGap
    }, $(go.Shape, { strokeWidth: 3, stroke: "black" }), $(go.Shape, { toArrow: "Standard", stroke: "black" }));
    var model = $(go.GraphLinksModel);
    model.nodeDataArray = [
        {
            key: "1020",
            name: "Cálculo 1",
            color: "blue"
        },
        {
            key: "1022",
            name: "Cálculo 2",
            color: "green"
        },
        {
            key: "1030",
            name: "Algebra 1",
            color: "blue"
        },
        {
            key: "1031",
            name: "Algebra 2",
            color: "green"
        },
        {
            key: "1023",
            name: "Discreta 1",
            color: "blue"
        },
        {
            key: "1026",
            name: "Discreta 2",
            color: "green"
        },
        {
            key: "1322",
            name: "Programación 1",
            color: "blue"
        },
        {
            key: "1321",
            name: "Programación 2",
            color: "green"
        },
        {
            key: "1323",
            name: "Programación 3",
            color: "orange"
        },
        {
            key: "1324",
            name: "Programación 4",
            color: "red"
        },
        {
            key: "1025",
            name: "Probabilidad",
            color: "orange"
        },
        {
            key: "1027",
            name: "Logica",
            color: "green"
        },
        {
            key: "1033",
            name: "Metodos",
            color: "orange"
        },
        {
            key: "1443",
            name: "Arquitectura",
            color: "orange"
        },
        {
            key: "1325",
            name: "Lenguajes",
            color: "red"
        },
        {
            key: "1532",
            name: "Sistemas",
            color: "red"
        },
        {
            key: "1327",
            name: "Taller",
            color: "purple"
        },
        {
            key: "1446",
            name: "Redes",
            color: "purple"
        }
    ];
    model.linkDataArray = [
        { from: "1020", to: "1022" },
        { from: "1023", to: "1026" },
        { from: "1030", to: "1031" },
        { from: "1322", to: "1321" },
        { from: "1022", to: "1025" },
        { from: "1022", to: "1033" },
        { from: "1030", to: "1026" },
        { from: "1031", to: "1033" },
        { from: "1321", to: "1443" },
        { from: "1023", to: "1443" },
        { from: "1027", to: "1443" },
        { from: "1020", to: "1443" },
        { from: "1023", to: "1027" },
        { from: "1321", to: "1323" },
        { from: "1323", to: "1324" },
        { from: "1020", to: "1324" },
        { from: "1030", to: "1324" },
        { from: "1026", to: "1911" },
        { from: "1027", to: "1911" },
        { from: "1323", to: "1911" },
        { from: "1023", to: "1323" },
        { from: "1030", to: "1025" },
        { from: "1322", to: "1033" },
        { from: "1324", to: "1327" },
        { from: "1023", to: "1327" },
        { from: "1020", to: "1325" },
        { from: "1030", to: "1325" },
        { from: "1027", to: "1325" },
        { from: "1323", to: "1325" },
        { from: "1020", to: "1532" },
        { from: "1030", to: "1532" },
        { from: "1323", to: "1532" },
        { from: "1443", to: "1532" },
        { from: "1443", to: "1446" },
        { from: "1532", to: "1446" },
    ];
    myDiagram.model = model;
  }
}
