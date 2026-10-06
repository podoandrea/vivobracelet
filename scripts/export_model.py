"""Export the supplied detailed Blender scene without changing the source file."""
import bpy, pathlib

out = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'models'
out.mkdir(parents=True, exist_ok=True)
scene = bpy.data.scenes['VIVO - Dettagli da fotografie']
bpy.context.window.scene = scene
bpy.ops.object.select_all(action='DESELECT')
roots = sorted([o for o in scene.objects if o.name.startswith('STRATO')], key=lambda o:o.name)
for i, root in enumerate(roots):
    root.name = f'component_{i}'
    root['componentIndex'] = i
    root.select_set(True)
    for obj in root.children_recursive:
        if obj.type in {'MESH','FONT','CURVE'}:
            # Two source curve terminals have a 1 m bevel on a millimetre-scale model.
            if obj.type == 'CURVE' and max(obj.dimensions) > .3:
                obj.data.bevel_depth = .00012
            obj.select_set(True)

# Convert text and curves so the real markings and copper winding travel with the model.
selected = list(bpy.context.selected_objects)
for obj in selected:
    if obj.type in {'FONT','CURVE'}:
        bpy.ops.object.select_all(action='DESELECT')
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.convert(target='MESH')
bpy.ops.object.select_all(action='DESELECT')
for root in roots:
    root.select_set(True)
    for obj in root.children_recursive:
        obj.select_set(True)
for mat in bpy.data.materials:
    if mat.use_nodes:
        for node in mat.node_tree.nodes:
            if node.type == 'BSDF_PRINCIPLED' and 'vetro' in mat.name.lower():
                node.inputs['Alpha'].default_value = .16
                node.inputs['Transmission Weight'].default_value = 0
                mat.surface_render_method = 'DITHERED'
bpy.ops.export_scene.gltf(filepath=str(out/'vivo-bracelet.glb'), export_format='GLB', use_selection=True,
    export_extras=True, export_animations=False, export_cameras=False, export_lights=False, export_apply=True,
    export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6)
print('EXPORTED',out/'vivo-bracelet.glb')
