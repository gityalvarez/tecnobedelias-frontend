import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/_models/Carrera';
import * as go from 'gojs';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { CarreraService } from 'src/app/_services/carrera.service';

@Component({
    selector: 'app-grafo',
    templateUrl: './grafo.component.html',
    styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit {

    constructor(private inscripcionService: InscripcionService, private carreraService: CarreraService) { }

    private carreraDiagram: go.Diagram = new go.Diagram();
    private asignaturaDiagram: go.Diagram = new go.Diagram();
    private prueba: go.GraphLinksModel = new go.GraphLinksModel();
    carreras: Carrera[];
    carrera: Carrera;

    ngOnInit() {

        this.carreraService.getCarreras().subscribe(
            (carreras) => {
                this.carreras = carreras;
            }
        );

    }

    onChange() {

        const $ = go.GraphObject.make;

        // Cambio de Asignatura en Diagrama de Asignatura //
        const showLocalOnLocalClick = () => {
            const selectedLocal = this.asignaturaDiagram.selection.first();
            if (selectedLocal !== null) {
                this.carreraDiagram.select(this.carreraDiagram.findPartForKey(selectedLocal.data.key));
            }
        };

        // Cambio de Asignatura en Diagrama de Carrera //
        const showLocalOnFullClick = () => {
            const node = this.carreraDiagram.selection.first();
            if (node !== null && node instanceof go.Node) {
                // highlighter.visible = true;
                this.carreraDiagram.scrollToRect(node.actualBounds);
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

                this.asignaturaDiagram.model = model;
                const selectedLocal = this.asignaturaDiagram.findPartForKey(node.data.key);
                if (selectedLocal !== null) { selectedLocal.isSelected = true; }
            } else {
                // this.asignatura.clearSelection();
                highlighter.visible = false;
                this.asignaturaDiagram.clear();
            }
        };

        // Resaltador Animado de Enlace //
        const loop = () => {
            const diagram = this.carreraDiagram;
            setTimeout(function() {
              const oldskips = diagram.skipsUndoManager;
              diagram.skipsUndoManager = true;
              diagram.links.each(function(link) {
                const shape = <go.Shape>link.findObject('PIPE');
                const off = shape.strokeDashOffset - 1;
                shape.strokeDashOffset = off <= 0 ? 16 : off;
              });
              diagram.skipsUndoManager = oldskips;
              loop();
            }, 50);
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
        this.carreraDiagram = $(go.Diagram, {
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
            ChangedSelection: showLocalOnFullClick,
        });

        // Diagrama de Asignatura //
        this.asignaturaDiagram = $(go.Diagram, {
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
                if (sel !== null) { this.asignaturaDiagram.scrollToRect(sel.actualBounds); }
            },
            maxSelectionCount: 1,
            ChangedSelection: showLocalOnLocalClick
        });

        this.carreraDiagram.add(
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
                    strokeWidth: 2,
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
        this.carreraDiagram.nodeTemplate = myNodeTemplate;
        this.asignaturaDiagram.nodeTemplate = myNodeTemplate;

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
                }).ofObject(),
                // { stroke: 'silver', strokeWidth: 2 }
                new go.Binding('strokeDashArray', 'isHighlighted', function(h) {
                    return h ? [10, 6] : [0, 0];
                  }).ofObject(),
                { name: 'PIPE', strokeCap: 'round' }
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
        this.carreraDiagram.linkTemplate = myLinkTemplate;
        this.asignaturaDiagram.linkTemplate = myLinkTemplate;
        // setupDiagram(10);

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
        this.carreraDiagram.add(highlighter);
        this.carreraDiagram.addDiagramListener('InitialLayoutCompleted', (e) => {
            const node0 = this.carreraDiagram.findPartForKey(0);
            if (node0 !== null) { node0.isSelected = true; }
            showLocalOnFullClick();
        });

        this.carreraDiagram.click = (e) => {
            this.carreraDiagram.startTransaction('no highlighteds');
            this.carreraDiagram.clearHighlighteds();
            this.carreraDiagram.commitTransaction('no highlighteds');
        };

        this.carreraService.getNodos(this.carrera.nombre).subscribe(
            (nodos) => {
                this.carreraService.getLinks(this.carrera.nombre).subscribe(
                    (links) => {
                        this.prueba.nodeDataArray = nodos;
                        this.prueba.linkDataArray = links;
                    }
                );

            }
        );

        this.carreraDiagram.model = this.prueba;
        this.carreraDiagram.div = <HTMLDivElement>document.getElementById('carreraDiagram');
        this.asignaturaDiagram.div = <HTMLDivElement>document.getElementById('asignaturaDiagram');
        this.carreraDiagram.contentAlignment = go.Spot.LeftCenter;
        this.carreraDiagram.padding = new go.Margin(0, 0, 0, 90);
        this.carreraDiagram.requestUpdate();
        this.asignaturaDiagram.requestUpdate();
        loop();
    }
}
