import { Component, OnInit, AfterViewInit, OnChanges, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Carrera } from 'src/app/_models/Carrera';
import * as go from 'gojs';

@Component({
    selector: 'app-grafo',
    templateUrl: './grafo.component.html',
    styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit, DoCheck {
    private carrera: go.Diagram = new go.Diagram();
    private asignatura: go.Diagram = new go.Diagram();
    private prueba: go.GraphLinksModel = new go.GraphLinksModel();

    ngOnInit() {
        const $ = go.GraphObject.make;

        // Cambio de Asignatura en Diagrama de Asignatura //
        const showLocalOnLocalClick = () => {
            const selectedLocal = this.asignatura.selection.first();
            if (selectedLocal !== null) {
                this.carrera.select(this.carrera.findPartForKey(selectedLocal.data.key));
            }
        };

        // Cambio de Asignatura en Diagrama de Carrera //
        const showLocalOnFullClick = () => {
            const node = this.carrera.selection.first();
            if (node !== null && node instanceof go.Node) {
                // highlighter.visible = true;
                this.carrera.scrollToRect(node.actualBounds);
                highlighter.location = node.location;

                const model = new go.GraphLinksModel();
                const nearby = node.findTreeParts(2);
                // const parent = node.findTreeParentNode();
                const links = node.findLinksConnected();
                const nodes = node.findNodesInto();
                // nearby.add(nodes);

                nearby.each((n) => {
                    if (n instanceof go.Node) { model.addNodeData(n.data); }
                    // model.addLinkData(n.data);
                });

                links.each((l) => {
                    model.addLinkData(l.data);
                });
                nodes.each((n) => {
                    model.addNodeData(n.data);
                });

                this.asignatura.model = model;
                const selectedLocal = this.asignatura.findPartForKey(node.data.key);
                if (selectedLocal !== null) { selectedLocal.isSelected = true; }
            } else {
                // this.asignatura.clearSelection();
                highlighter.visible = false;
                this.asignatura.clear();
            }
        };

        // Crear Diagrama Aleatorio //
        function setupDiagram(total) {
            if (total === undefined) { total = 20; }
            const nodeDataArray = [];
            for (let i = 0; i < total; i++) {
                nodeDataArray.push({
                    key: nodeDataArray.length,
                    color: go.Brush.randomColor()
                });
            }
            let j = 0;
            for (let i = 1; i < total; i++) {
                const data = nodeDataArray[i];
                data.parent = j;
                if (Math.random() < 0.3) { j++; }
            }
            // this.asignatura.model = new go.GraphLinksModel(nodeDataArray);
        }

        // Diagrama de Carrera //
        this.carrera = $(go.Diagram, {
            // initialAutoScale: go.Diagram.UniformToFill,
            // maxScale: 0.5,
            initialContentAlignment: go.Spot.Center,
            isReadOnly: false,
            'animationManager.isEnabled': false,
            'undoManager.isEnabled': true,
            layout: $(go.TreeLayout, {
                angle: 0,
                // sorting: go.TreeLayout.SortingAscending,
                layerSpacing: 40,
                nodeSpacing: 20,
                layerStyle: go.TreeLayout.LayerUniform,
                treeStyle: go.TreeLayout.StyleLayered
                // alignment: go.TreeLayout.AlignmentEnd,
                // arrangement: go.TreeLayout.ArrangementVertical,
                // sorting: go.TreeLayout.SortingAscending
            }),
            maxSelectionCount: 1,
            ChangedSelection: showLocalOnFullClick
        });

        // Diagrama de Asignatura //
        this.asignatura = $(go.Diagram, {
            // initialAutoScale: go.Diagram.UniformToFill,
            initialContentAlignment: go.Spot.Center,
            isReadOnly: true,
            layout: $(go.TreeLayout, {
                angle: 0,
                // sorting: go.TreeLayout.SortingAscending
                layerSpacing: 40,
                nodeSpacing: 20,
                layerStyle: go.TreeLayout.LayerUniform,
                // treeStyle: go.TreeLayout.StyleLayered,
                // alignment: go.TreeLayout.AlignmentEnd,
                // arrangement: go.TreeLayout.ArrangementVertical,
                // sorting: go.TreeLayout.SortingAscending
            }),
            LayoutCompleted: (e) => {
                const sel = e.diagram.selection.first();
                if (sel !== null) { this.asignatura.scrollToRect(sel.actualBounds); }
            },
            maxSelectionCount: 1,
            ChangedSelection: showLocalOnLocalClick
        });

        this.carrera.add(
            $(
                go.Part,
                $(go.TextBlock, 'Carrera', {
                    margin: 10,
                    font: 'bold 32px sans-serif',
                    stroke: 'white',
                    isMultiline: false
                    // editable: true
                })
            )
        );

        // Plantilla de Nodo //
        const myNodeTemplate = $(
            go.Node,
            'Auto',
            {
                locationSpot: go.Spot.Center,
                click: (e, node) => {
                    const diagram = node.diagram;
                    diagram.startTransaction('highlight');
                    diagram.clearHighlighteds();
                    node.findLinksConnected().each((l) => {
                        l.isHighlighted = true;
                    });
                    node.findNodesConnected().each((n) => {
                        n.isHighlighted = true;
                    });
                    /*node.findNodesOutOf().each((n) => {
                        n.isHighlighted = true;
                    });
                    node.findLinksOutOf().each((l) => {
                        l.isHighlighted = true;
                    });*/
                    diagram.commitTransaction('highlight');
                }
            },
            new go.Binding('text', 'key', go.Binding.toString),
            $(
                go.Shape,
                'RoundedRectangle',
                new go.Binding('fill', 'color'),
                new go.Binding('stroke', 'isHighlighted', (h) => {
                    return h ? 'black' : 'grey';
                }).ofObject(),
                new go.Binding('strokeWidth', 'isHighlighted', (h) => {
                    return h ? 2 : 2;
                }).ofObject(),
                {
                    stroke: 'grey',
                    strokeWidth: 2
                    // parameter1: 10,
                    /*
                    fill: 'black',
                    portId: '',
                    cursor: 'pointer',
                    fromLinkable: true,
                    fromLinkableSelfNode: true,
                    fromLinkableDuplicates: true,
                    toLinkable: true,
                    toLinkableSelfNode: true,
                    toLinkableDuplicates: true
                    */
                }
            ),
            {
                selectionAdornmentTemplate: $(
                    go.Adornment,
                    'Auto',
                    $(
                        go.Shape,
                        'RoundedRectangle',
                        {
                            fill: null,
                            stroke: 'black' /*dimgrey,dodgerblue*/,
                            strokeWidth: 4
                            // parameter1: 10,
                        }
                        // new go.Binding('stroke', 'color')
                    ),
                    $(go.Placeholder, { padding: -4 })
                )
            },
            $(
                go.TextBlock,
                'Default Text',
                {
                    margin: 4,
                    font: 'bold 14px sans-serif',
                    stroke: 'white',
                    isMultiline: false
                    // editable: true
                },
                new go.Binding('text', 'name').makeTwoWay()
            )
            // $('TreeExpanderButton')
            /*
            $(
                go.TextBlock,
                { margin: 5 },
                new go.Binding('text', 'key', (k) => {
                return 'Asignatura ' + k;
                })
            )
            */
        );
        this.carrera.nodeTemplate = myNodeTemplate;
        this.asignatura.nodeTemplate = myNodeTemplate;

        // Plantilla de Enlace //
        const myLinkTemplate = $(
            go.Link,
            {
                click: (e, link) => {
                    const diagram = link.diagram;
                    diagram.startTransaction('highlight');
                    diagram.clearHighlighteds();
                    link.isHighlighted = true;
                    link.fromNode.isHighlighted = true;
                    link.toNode.isHighlighted = true;
                    diagram.commitTransaction('highlight');
                },
                routing: go.Link.AvoidsNodes /*Normal*/,
                selectable: true,
                corner: 10,
                // relinkableFrom: true,
                // relinkableTo: true,
                curve: go.Link.JumpGap
            },
            $(
                go.Shape,
                new go.Binding('stroke', 'isHighlighted', (h) => {
                    return h ? 'black' : 'grey';
                }).ofObject(),
                new go.Binding('strokeWidth', 'isHighlighted', (h) => {
                    return h ? 4 : 2;
                }).ofObject()
                // { stroke: 'silver', strokeWidth: 2 }
            ),
            $(
                go.Shape,
                {
                    toArrow: 'Triangle' /*Standard,Boomerang,Block,Circle,Diamond,Fork*/,
                    // fill: 'grey',
                    // stroke: 'grey',
                    strokeWidth: 2
                },
                new go.Binding('fill', 'isHighlighted', (h) => {
                    return h ? 'black' : 'grey';
                }).ofObject(),
                new go.Binding('stroke', 'isHighlighted', (h) => {
                    return h ? 'black' : 'grey';
                }).ofObject(),
                new go.Binding('strokeWidth', 'isHighlighted', (h) => {
                    return h ? 4 : 2;
                }).ofObject()
            ),
            {
                selectionAdornmentTemplate: $(
                    go.Adornment,
                    'Auto'
                )
            }
        );
        this.carrera.linkTemplate = myLinkTemplate;
        this.asignatura.linkTemplate = myLinkTemplate;
        setupDiagram(10);

        // Resaltador de Asignatura //
        const highlighter = $(
            go.Part,
            'Auto',
            {
                layerName: 'Background',
                selectable: false,
                // isInDocumentBounds: false,
                locationSpot: go.Spot.Center
            },
            $(go.Shape, 'Ellipse', {
                fill: 'white',
                stroke: 'lightgrey',
                strokeWidth: 4
            })
        );
        this.carrera.add(highlighter);
        this.carrera.addDiagramListener('InitialLayoutCompleted', (e) => {
            const node0 = this.carrera.findPartForKey(0);
            if (node0 !== null) { node0.isSelected = true; }
            showLocalOnFullClick();
        });

        this.carrera.click = (e) => {
            this.carrera.startTransaction('no highlighteds');
            this.carrera.clearHighlighteds();
            this.carrera.commitTransaction('no highlighteds');
        };

        // Caso de Prueba //
        // this.prueba = $(go.GraphLinksModel);
        this.prueba.nodeDataArray = [
            {
                key: '1020',
                name: 'Cálculo 1',
                color: 'blue'
            },
            {
                key: '1022',
                name: 'Cálculo 2',
                color: 'green'
            },
            {
                key: '1030',
                name: 'Algebra 1',
                color: 'blue'
            },
            {
                key: '1031',
                name: 'Algebra 2',
                color: 'green'
            },
            {
                key: '1023',
                name: 'Discreta 1',
                color: 'blue'
            },
            {
                key: '1026',
                name: 'Discreta 2',
                color: 'green'
            },
            {
                key: '1322',
                name: 'Programación 1',
                color: 'blue'
            },
            {
                key: '1321',
                name: 'Programación 2',
                color: 'green'
            },
            {
                key: '1323',
                name: 'Programación 3',
                color: 'darkorange'
            },
            {
                key: '1324',
                name: 'Programación 4',
                color: 'red'
            },
            {
                key: '1025',
                name: 'Probabilidad',
                color: 'darkorange'
            },
            {
                key: '1027',
                name: 'Logica',
                color: 'green'
            },
            {
                key: '1033',
                name: 'Metodos',
                color: 'darkorange'
            },
            {
                key: '1443',
                name: 'Arquitectura',
                color: 'darkorange'
            },
            {
                key: '1325',
                name: 'Lenguajes',
                color: 'red'
            },
            {
                key: '1532',
                name: 'Sistemas',
                color: 'red'
            },
            {
                key: '1327',
                name: 'Taller',
                color: 'purple'
            },
            {
                key: '1446',
                name: 'Redes',
                color: 'purple'
            }
        ];

        this.prueba.linkDataArray = [
            { from: '1020', to: '1022' },
            { from: '1023', to: '1026' },
            { from: '1030', to: '1031' },
            { from: '1322', to: '1321' },
            { from: '1022', to: '1025' },
            { from: '1022', to: '1033' },
            { from: '1030', to: '1026' },
            { from: '1031', to: '1033' },
            { from: '1321', to: '1443' },
            { from: '1023', to: '1443' },
            { from: '1027', to: '1443' },
            { from: '1020', to: '1443' },
            { from: '1023', to: '1027' },
            { from: '1321', to: '1323' },
            { from: '1323', to: '1324' },
            { from: '1020', to: '1324' },
            { from: '1030', to: '1324' },
            { from: '1026', to: '1911' },
            { from: '1027', to: '1911' },
            { from: '1323', to: '1911' },
            { from: '1023', to: '1323' },
            { from: '1030', to: '1025' },
            { from: '1322', to: '1033' },
            { from: '1324', to: '1327' },
            { from: '1023', to: '1327' },
            { from: '1020', to: '1325' },
            { from: '1030', to: '1325' },
            { from: '1027', to: '1325' },
            { from: '1323', to: '1325' },
            { from: '1020', to: '1532' },
            { from: '1030', to: '1532' },
            { from: '1323', to: '1532' },
            { from: '1443', to: '1532' },
            { from: '1443', to: '1446' },
            { from: '1532', to: '1446' }
        ];

        this.carrera.model = this.prueba;
    }
    ngDoCheck() {
        this.carrera.div = <HTMLDivElement>document.getElementById('carrera');
        this.asignatura.div = <HTMLDivElement>document.getElementById('asignatura');
        this.carrera.requestUpdate();
        this.asignatura.requestUpdate();
    }
}
