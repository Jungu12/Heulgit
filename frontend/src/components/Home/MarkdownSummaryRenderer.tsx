import { colors } from '@constants/colors';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import raw from 'rehype-raw';
import gfm from 'remark-gfm';
import { CopyBlock, dracula } from 'react-code-blocks';
import { styled } from 'styled-components';
import { getImgTag } from '@utils/markdown';
import ImageSlider from './ImageSlider';

const StyledMarkDownContainer = styled.div`
	font-size: 1rem;
	line-height: 2.5rem;
	padding: 0 16px;
`;

const StyledMarkDownH1 = styled.h1`
	padding-bottom: 0.3em;
	font-size: 2em;
	font-weight: 700;
	border-bottom: 1px solid ${colors.greyScale.grey3};
	margin-top: 24px;
	margin-bottom: 16px;
	line-height: 1.25;
`;

const StyledMarkDownH2 = styled.h2`
	padding-bottom: 0.3em;
	font-weight: 600;
	font-size: 1.5em;
	border-bottom: 1px solid ${colors.greyScale.grey3};
	margin-top: 24px;
	margin-bottom: 16px;
	line-height: 1.25;
`;

const StyledMarkDownH3 = styled.h3`
	padding-bottom: 0.3em;
	font-weight: 600;
	font-size: 1.25em;
	margin-top: 24px;
	margin-bottom: 16px;
	line-height: 1.25;
`;

const StyledMarkDownP = styled.p`
	font-weight: 400;
	font-size: 1em;
	margin-bottom: 16px;
`;

const StyledMarkDownOl = styled.ol`
	list-style-type: decimal;
	padding-left: 2em;
`;

const StyledMarkDownUl = styled.ul`
	list-style-type: disc;
	padding-left: 2em;
`;

const StyledMarkDownBlockquote = styled.blockquote`
	padding: 0 1em;
	/* color: var(--fgColor-muted, var(--color-fg-muted)); */
	border-left: 0.25em solid ${colors.primary.primaryLighten};
	margin-bottom: 16px;
`;

const StyledMarkDownTable = styled.table`
	border: 1px #a39485 solid;
	font-size: 0.9em;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
	width: 100%;
	border-collapse: collapse;
	border: 1px solid ${colors.greyScale.grey4};

	th {
		text-align: left;
	}

	thead {
		font-weight: bold;
		color: #fff;
		background: ${colors.primary.primary};
	}

	td,
	th {
		padding: 1em 1.5em;
		vertical-align: middle;
		border-left: 1px solid ${colors.greyScale.grey3};
		border-right: 1px solid ${colors.greyScale.grey3};
	}

	td {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		background: #fff;
	}
`;

const StyledMarkDonwA = styled.a`
	color: #3371e4;
	font-weight: 500;
	text-decoration: none;
	cursor: pointer;
`;

const StyledMarkDownStrong = styled.strong`
	font-weight: 600;
`;

const StyledCodeContainer = styled.div`
	position: relative;
	margin-bottom: 16px;

	div > button {
		position: absolute;
		bottom: 6px;
		top: unset;
	}
`;

const StyledLanguageType = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	height: 28px;
	z-index: 1;
	bottom: 2px;
	right: 34px;
	padding: 4px 12px;
	font-size: 12px;
	font-weight: 600;
	border-radius: 24px;
	color: ${colors.primary.primaryLighten};
`;

const StyledTableContainer = styled.div`
	width: 100%;
	white-space: nowrap;
	overflow: auto;
`;

type Props = {
	text: string;
	onClick: () => void;
};

const MarkdownSummaryRenderer = ({ text, onClick }: Props) => {
	const summary = text.slice(0, 300);
	const [imageList, setImageList] = useState<string[]>([]);

	useEffect(() => {
		setImageList(getImgTag(text));
	}, [text]);

	return (
		<StyledMarkDownContainer onClick={onClick}>
			<ReactMarkdown
				remarkPlugins={[gfm, remarkEmoji]}
				rehypePlugins={[raw]}
				components={{
					h1({ children }) {
						return <StyledMarkDownH1>{children}</StyledMarkDownH1>;
					},
					h2({ children }) {
						return <StyledMarkDownH2>{children}</StyledMarkDownH2>;
					},
					h3({ children }) {
						return <StyledMarkDownH3>{children}</StyledMarkDownH3>;
					},
					p({ children }) {
						return <StyledMarkDownP>{children}</StyledMarkDownP>;
					},
					img() {
						return <></>;
					},
					code({ children, className }) {
						const languageType = className?.split('language-')[1] as string;

						return (
							<StyledCodeContainer>
								<StyledLanguageType>{languageType}</StyledLanguageType>
								<CopyBlock
									text={children[0] as string}
									language={languageType}
									showLineNumbers={true}
									theme={dracula}
									wrapLines={true}
									codeBlock
									copied={true}
									wrapLongLines={false}
									onCopy={() => {}}
								/>
							</StyledCodeContainer>
						);
					},
					blockquote({ children }) {
						return (
							<StyledMarkDownBlockquote>{children}</StyledMarkDownBlockquote>
						);
					},
					strong({ children }) {
						return <StyledMarkDownStrong>{children}</StyledMarkDownStrong>;
					},
					ol({ children, start }) {
						return (
							<StyledMarkDownOl start={start ? start : 1}>
								{children}
							</StyledMarkDownOl>
						);
					},
					ul({ children }) {
						return <StyledMarkDownUl>{children}</StyledMarkDownUl>;
					},
					table({ children }) {
						return (
							<StyledTableContainer>
								<StyledMarkDownTable>{children}</StyledMarkDownTable>
							</StyledTableContainer>
						);
					},
					a({ children, href }) {
						return (
							<StyledMarkDonwA href={href} target="_blank">
								{children}
							</StyledMarkDonwA>
						);
					},
				}}
			>
				{summary}
			</ReactMarkdown>
			{imageList.length ? <ImageSlider images={imageList} /> : <></>}
		</StyledMarkDownContainer>
	);
};

export default MarkdownSummaryRenderer;
