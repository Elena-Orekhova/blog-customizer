import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Интерфейсы
export interface PageStyles {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	containerWidth: string;
	bgColor: string;
}

interface ArticleParamsFormProps {
	isOpen: boolean;
	setPageStyles: (newStyles: PageStyles) => void;
}

// Форма параметров статьи
export const ArticleParamsForm = ({
	isOpen,
	setPageStyles,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(!isOpen);
	const formRef = useRef<HTMLDivElement>(null);

	const handleArrowButtonClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsFormOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Функция для применения текущих выбранных стилей к статье
	const applyStyles = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newStyles: PageStyles = {
			fontFamily: selectedFontFamilyOptions?.value || '',
			fontSize: selectedFontSizeOptions?.value || '',
			fontColor: selectedFontColors?.value || '',
			containerWidth: selectedContentWidthArr?.value || '',
			bgColor: selectedBackgroundColors?.value || '',
		};
		setPageStyles(newStyles);
		setIsFormOpen(false);
	};

	// Функция для сброса настроек формы и применения начальных стилей к статье
	const resetForm = () => {
		setSelectedFontFamilyOptions(fontFamilyOptions[0]);
		setSelectedFontSizeOptions(fontSizeOptions[0]);
		setSelectedFontColors(fontColors[0]);
		setSelectedBackgroundColors(backgroundColors[0]);
		setSelectedContentWidthArr(contentWidthArr[0]);
		setPageStyles(styles);
	};

	const [selectedFontFamilyOptions, setSelectedFontFamilyOptions] =
		useState<OptionType>(fontFamilyOptions[0]);
	const [selectedFontSizeOptions, setSelectedFontSizeOptions] =
		useState<OptionType>(fontSizeOptions[0]);
	const [selectedFontColors, setSelectedFontColors] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBackgroundColors, setSelectedBackgroundColors] =
		useState<OptionType>(backgroundColors[0]);
	const [selectedContentWidthArr, setSelectedContentWidthArr] =
		useState<OptionType>(contentWidthArr[0]);
	return (
		<>
			<ArrowButton onClick={handleArrowButtonClick} isOpen={isFormOpen} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isFormOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={applyStyles}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFontFamilyOptions}
						onChange={setSelectedFontFamilyOptions}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedFontSizeOptions}
						name='radio'
						onChange={setSelectedFontSizeOptions}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedFontColors}
						onChange={setSelectedFontColors}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColors}
						onChange={setSelectedBackgroundColors}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidthArr}
						onChange={setSelectedContentWidthArr}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
