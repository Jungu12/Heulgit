import { Node } from 'unist';

export interface ImageNode extends Node {
	type: 'image';
	url: string;
	alt: string;
}

export type ImageType = {
	src: string;
	alt: string;
};
