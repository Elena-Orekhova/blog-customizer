import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	PageStyles,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageStyles, setPageStyles] = useState<PageStyles>({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		containerWidth: defaultArticleState.contentWidth.value,
		bgColor: defaultArticleState.backgroundColor.value,
	});

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageStyles.fontFamily,
					'--font-size': pageStyles.fontSize,
					'--font-color': pageStyles.fontColor,
					'--container-width': pageStyles.containerWidth,
					'--bg-color': pageStyles.bgColor,
				} as CSSProperties
			}>
			<ArticleParamsForm isOpen={true} setPageStyles={setPageStyles} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
