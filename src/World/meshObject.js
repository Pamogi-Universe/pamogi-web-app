import { useLoader } from '@react-three/fiber';
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function MeshObject(params) {
    const { materials, scene } = useLoader(
        GLTFLoader,
        params.modelPath
    ); // load the model

    useMemo(() => {
        for (const material in materials) {
            // iterate the materials
            if (Object.prototype.hasOwnProperty.call(materials, material)) {
                // change the color of all the materials (there's only one in this model)
                materials[material].color.set("#bb6f3e");
                // you can also change the color of a specific material if you know the name of the material
            }
        }
    }, [materials]);

    return <primitive object={scene} />;
}
