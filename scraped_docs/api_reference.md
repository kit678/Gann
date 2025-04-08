# api reference

*This document contains aggregated content from 4 URLs*

## Table of Contents

1. [API Reference | Advanced Charts Documentation](#api-reference-|-advanced-charts-documentation)
2. [Module: Broker | Advanced Charts Documentation](#module-broker-|-advanced-charts-documentation)
3. [Module: Charting Library | Advanced Charts Documentation](#module-charting-library-|-advanced-charts-documentation)
4. [Module: Datafeed | Advanced Charts Documentation](#module-datafeed-|-advanced-charts-documentation)


---

## API Reference | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/api/*

  * [](/charting-library-docs/)
  * API Reference

On this page

# API Reference

## Structureâ

The API is structured as a modular system of types, interfaces, and enumerations. The library's API is divided into three modules, where each module consists of interfaces that define properties and methods specific to its functionality.

### Charting Library moduleâ

The [Charting Library module](/charting-library-docs/latest/api/modules/Charting_Library) is designed to manage chart creation, customize the UI appearance, and handle user interactions.

#### Key featuresâ

  * Manage drawings and indicators displayed on the chart.
  * Customize chart themes, layouts, and behaviors.
  * Handle user interactions through events and methods.

#### Common interfacesâ

## [ Advanced Charts Widget OptionsProperties for Advanced Chart widget to customize its appearance and behavior](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/)## [ Trading Platform Widget OptionsProperties for Trading Platform widget to customize its appearance and behavior](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/)## [ IChartingLibrary WidgetPrimary interface for library interactions](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget/)## [ IChart WidgetPrimary interface for chart interactions, such as creating drawings and indicators](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi/)   

### Datafeed moduleâ

The [Datafeed module](/charting-library-docs/latest/api/modules/Datafeed) is designed to integrate custom data sources and controlling data flow to the chart.

#### Key featuresâ

  * Connect any market data source to Advanced Charts.
  * Handle custom symbology logic to map your backend symbols to TradingView's requirements.
  * Synchronize chart data with live market data updates.

#### Common interfacesâ

## [ SymbolInfoDefines the structure and metadata for symbols, including properties like ticker and exchange](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo/)## [ IExternal DatafeedActs as the entry point for connecting custom datafeeds to the library](/charting-library-docs/latest/api/interfaces/Datafeed.IExternalDatafeed)## [ IDatafeed ChartProvides methods for fetching and managing historical and real-time data](/charting-library-docs/latest/api/interfaces/Datafeed.IDatafeedChartApi)## [ IDatafeed QuotesEnables the retrieval and management of real-time market quotes](/charting-library-docs/latest/api/interfaces/Datafeed.IDatafeedQuotesApi)   

### Broker moduleâ

The [Broker module](/charting-library-docs/latest/api/modules/Broker) is designed to integrate trading capabilities provided by [Trading Platform](/charting-library-docs/latest/trading_terminal/).

#### Key featuresâ

  * Enable creating market, limit, and other order types directly from the chart interface.
  * Provide real-time market quotes to power trading features like the [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket), [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List), and [Depth of Market](/charting-library-docs/latest/trading_terminal/depth-of-market).
  * Support multiple account setups for users with diverse trading needs.

#### Common interfacesâ

## [ Broker APIEnables trading features and connects the charts with your trading logic](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal)## [ Trading HostReceives trading information from your backend server and provides the library with updates](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost)## [ Broker configurationDefines configuration for additional Trading Platform features](/charting-library-docs/latest/api/interfaces/Charting_Library.SingleBrokerMetaInfo)   

## Best practices for navigationâ

  1. Identify the module relevant to your task: creating charts, managing datafeeds, or enabling trading.
  2. Examine the available interfaces within the module. Each interface defines a set of properties and methods relevant to a specific feature or functionality.
  3. Follow type links and explore enumerations. If a property uses a non-primitive type, follow the link to the corresponding type definition. This will reveal additional properties and their relationships.
  4. Get back into the context and use your browserâs navigation to return to higher-level modules or interfaces when needed.

### Browse TypeScript definitionâ

Alternatively, if you are more comfortable browsing the API through a TypeScript definition file, you can use the following links:

  * [Charting Library and Broker TypeScript definition](https://github.dev/tradingview/charting_library/blob/master/charting_library/charting_library.d.ts)
  * [Datafeed TypeScript definition](https://github.dev/tradingview/charting_library/blob/master/charting_library/datafeed-api.d.ts)

#### Keyboard shortcuts for Visual Studio Codeâ

Action| Windows shortcut| macOS shortcut  
---|---|---  
Find| `Ctrl` \+ `F`| `Cmd` \+ `F`  
Go to definition| `F12` or `Ctrl` \+ Click| `F12` or `Cmd` \+ Click  
Go back| `Ctrl` \+ `-`| `Cmd` \+ `-`


---

## Module: Broker | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/api/modules/Broker*

  * [](/charting-library-docs/)  
  * Modules
  * Broker

On this page

# Module: Broker

Broker JS API for TradingView Trading Platform

## Enumerationsâ

  * [BottomWidgetBarMode](/charting-library-docs/latest/api/enums/Broker.BottomWidgetBarMode)
  * [CommonAccountManagerColumnId](/charting-library-docs/latest/api/enums/Broker.CommonAccountManagerColumnId)
  * [ConnectionStatus](/charting-library-docs/latest/api/enums/Broker.ConnectionStatus)
  * [ConnectionType](/charting-library-docs/latest/api/enums/Broker.ConnectionType)
  * [DisconnectType](/charting-library-docs/latest/api/enums/Broker.DisconnectType)
  * [NotificationType](/charting-library-docs/latest/api/enums/Broker.NotificationType)
  * [OrderOrPositionMessageType](/charting-library-docs/latest/api/enums/Broker.OrderOrPositionMessageType)
  * [OrderStatus](/charting-library-docs/latest/api/enums/Broker.OrderStatus)
  * [OrderStatusFilter](/charting-library-docs/latest/api/enums/Broker.OrderStatusFilter)
  * [OrderTicketFocusControl](/charting-library-docs/latest/api/enums/Broker.OrderTicketFocusControl)
  * [OrderType](/charting-library-docs/latest/api/enums/Broker.OrderType)
  * [ParentType](/charting-library-docs/latest/api/enums/Broker.ParentType)
  * [PriceType](/charting-library-docs/latest/api/enums/Broker.PriceType)
  * [Side](/charting-library-docs/latest/api/enums/Broker.Side)
  * [StandardFormatterName](/charting-library-docs/latest/api/enums/Broker.StandardFormatterName)
  * [StopType](/charting-library-docs/latest/api/enums/Broker.StopType)

## Interfacesâ

  * [AccountManagerColumnBase](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerColumnBase)
  * [AccountManagerInfo](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerInfo)
  * [AccountManagerPage](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerPage)
  * [AccountManagerSummaryField](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerSummaryField)
  * [AccountManagerTable](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerTable)
  * [AccountManagerTableFlags](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerTableFlags)
  * [AccountMetainfo](/charting-library-docs/latest/api/interfaces/Broker.AccountMetainfo)
  * [ActionDescription](/charting-library-docs/latest/api/interfaces/Broker.ActionDescription)
  * [ActionDescriptionWithCallback](/charting-library-docs/latest/api/interfaces/Broker.ActionDescriptionWithCallback)
  * [BaseInputFieldValidatorResult](/charting-library-docs/latest/api/interfaces/Broker.BaseInputFieldValidatorResult)
  * [BracketOrder](/charting-library-docs/latest/api/interfaces/Broker.BracketOrder)
  * [BracketOrderBase](/charting-library-docs/latest/api/interfaces/Broker.BracketOrderBase)
  * [Brackets](/charting-library-docs/latest/api/interfaces/Broker.Brackets)
  * [BrokerConfigFlags](/charting-library-docs/latest/api/interfaces/Broker.BrokerConfigFlags)
  * [BrokerCustomUI](/charting-library-docs/latest/api/interfaces/Broker.BrokerCustomUI)
  * [ChangeAccountSolution](/charting-library-docs/latest/api/interfaces/Broker.ChangeAccountSolution)
  * [ChangeSymbolSolution](/charting-library-docs/latest/api/interfaces/Broker.ChangeSymbolSolution)
  * [CheckboxFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Broker.CheckboxFieldMetaInfo)
  * [ClosePositionPreviewResult](/charting-library-docs/latest/api/interfaces/Broker.ClosePositionPreviewResult)
  * [ClosePositionPreviewRowData](/charting-library-docs/latest/api/interfaces/Broker.ClosePositionPreviewRowData)
  * [ClosePositionPreviewSeparator](/charting-library-docs/latest/api/interfaces/Broker.ClosePositionPreviewSeparator)
  * [CryptoBalance](/charting-library-docs/latest/api/interfaces/Broker.CryptoBalance)
  * [CustomComboBoxItem](/charting-library-docs/latest/api/interfaces/Broker.CustomComboBoxItem)
  * [CustomComboBoxMetaInfo](/charting-library-docs/latest/api/interfaces/Broker.CustomComboBoxMetaInfo)
  * [CustomFieldMetaInfoBase](/charting-library-docs/latest/api/interfaces/Broker.CustomFieldMetaInfoBase)
  * [CustomFields](/charting-library-docs/latest/api/interfaces/Broker.CustomFields)
  * [CustomInputFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Broker.CustomInputFieldMetaInfo)
  * [CustomInputFieldsValues](/charting-library-docs/latest/api/interfaces/Broker.CustomInputFieldsValues)
  * [CustomTableElementFormatter](/charting-library-docs/latest/api/interfaces/Broker.CustomTableElementFormatter)
  * [DOMData](/charting-library-docs/latest/api/interfaces/Broker.DOMData)
  * [DOMLevel](/charting-library-docs/latest/api/interfaces/Broker.DOMLevel)
  * [DefaultContextMenuActionsParams](/charting-library-docs/latest/api/interfaces/Broker.DefaultContextMenuActionsParams)
  * [DefaultDropdownActionsParams](/charting-library-docs/latest/api/interfaces/Broker.DefaultDropdownActionsParams)
  * [DisconnectionInfo](/charting-library-docs/latest/api/interfaces/Broker.DisconnectionInfo)
  * [ErrorFormatterParseResult](/charting-library-docs/latest/api/interfaces/Broker.ErrorFormatterParseResult)
  * [Execution](/charting-library-docs/latest/api/interfaces/Broker.Execution)
  * [FormatterFormatOptions](/charting-library-docs/latest/api/interfaces/Broker.FormatterFormatOptions)
  * [FormatterParseOptions](/charting-library-docs/latest/api/interfaces/Broker.FormatterParseOptions)
  * [FormatterParseResult](/charting-library-docs/latest/api/interfaces/Broker.FormatterParseResult)
  * [HyperlinkInfo](/charting-library-docs/latest/api/interfaces/Broker.HyperlinkInfo)
  * [IBoxedValue](/charting-library-docs/latest/api/interfaces/Broker.IBoxedValue)
  * [IBoxedValueReadOnly](/charting-library-docs/latest/api/interfaces/Broker.IBoxedValueReadOnly)
  * [IBrokerAccountInfo](/charting-library-docs/latest/api/interfaces/Broker.IBrokerAccountInfo)
  * [IBrokerCommon](/charting-library-docs/latest/api/interfaces/Broker.IBrokerCommon)
  * [IBrokerConnectionAdapterFactory](/charting-library-docs/latest/api/interfaces/Broker.IBrokerConnectionAdapterFactory)
  * [IBrokerConnectionAdapterHost](/charting-library-docs/latest/api/interfaces/Broker.IBrokerConnectionAdapterHost)
  * [IBrokerTerminal](/charting-library-docs/latest/api/interfaces/Broker.IBrokerTerminal)
  * [IDelegate](/charting-library-docs/latest/api/interfaces/Broker.IDelegate)
  * [IFormatter](/charting-library-docs/latest/api/interfaces/Broker.IFormatter)
  * [INumberFormatter](/charting-library-docs/latest/api/interfaces/Broker.INumberFormatter)
  * [IObservable](/charting-library-docs/latest/api/interfaces/Broker.IObservable)
  * [IObservableValue](/charting-library-docs/latest/api/interfaces/Broker.IObservableValue)
  * [IObservableValueReadOnly](/charting-library-docs/latest/api/interfaces/Broker.IObservableValueReadOnly)
  * [IPriceFormatter](/charting-library-docs/latest/api/interfaces/Broker.IPriceFormatter)
  * [ISubscription](/charting-library-docs/latest/api/interfaces/Broker.ISubscription)
  * [ISymbolValueFormatter](/charting-library-docs/latest/api/interfaces/Broker.ISymbolValueFormatter)
  * [IWatchedValue](/charting-library-docs/latest/api/interfaces/Broker.IWatchedValue)
  * [IWatchedValueReadonly](/charting-library-docs/latest/api/interfaces/Broker.IWatchedValueReadonly)
  * [IndividualPosition](/charting-library-docs/latest/api/interfaces/Broker.IndividualPosition)
  * [IndividualPositionBase](/charting-library-docs/latest/api/interfaces/Broker.IndividualPositionBase)
  * [InstrumentInfo](/charting-library-docs/latest/api/interfaces/Broker.InstrumentInfo)
  * [IsTradableResult](/charting-library-docs/latest/api/interfaces/Broker.IsTradableResult)
  * [LeverageInfo](/charting-library-docs/latest/api/interfaces/Broker.LeverageInfo)
  * [LeverageInfoParams](/charting-library-docs/latest/api/interfaces/Broker.LeverageInfoParams)
  * [LeveragePreviewResult](/charting-library-docs/latest/api/interfaces/Broker.LeveragePreviewResult)
  * [LeverageSetParams](/charting-library-docs/latest/api/interfaces/Broker.LeverageSetParams)
  * [LeverageSetResult](/charting-library-docs/latest/api/interfaces/Broker.LeverageSetResult)
  * [MenuSeparator](/charting-library-docs/latest/api/interfaces/Broker.MenuSeparator)
  * [NegativeBaseInputFieldValidatorResult](/charting-library-docs/latest/api/interfaces/Broker.NegativeBaseInputFieldValidatorResult)
  * [OpenUrlSolution](/charting-library-docs/latest/api/interfaces/Broker.OpenUrlSolution)
  * [OrderDialogOptions](/charting-library-docs/latest/api/interfaces/Broker.OrderDialogOptions)
  * [OrderDuration](/charting-library-docs/latest/api/interfaces/Broker.OrderDuration)
  * [OrderDurationMetaInfo](/charting-library-docs/latest/api/interfaces/Broker.OrderDurationMetaInfo)
  * [OrderOrPositionMessage](/charting-library-docs/latest/api/interfaces/Broker.OrderOrPositionMessage)
  * [OrderPreviewResult](/charting-library-docs/latest/api/interfaces/Broker.OrderPreviewResult)
  * [OrderPreviewSection](/charting-library-docs/latest/api/interfaces/Broker.OrderPreviewSection)
  * [OrderPreviewSectionRow](/charting-library-docs/latest/api/interfaces/Broker.OrderPreviewSectionRow)
  * [OrderRule](/charting-library-docs/latest/api/interfaces/Broker.OrderRule)
  * [OrderTemplate](/charting-library-docs/latest/api/interfaces/Broker.OrderTemplate)
  * [OrderTemplateBase](/charting-library-docs/latest/api/interfaces/Broker.OrderTemplateBase)
  * [OrderTicketSettings](/charting-library-docs/latest/api/interfaces/Broker.OrderTicketSettings)
  * [PipValues](/charting-library-docs/latest/api/interfaces/Broker.PipValues)
  * [PlaceOrderResult](/charting-library-docs/latest/api/interfaces/Broker.PlaceOrderResult)
  * [PlacedOrder](/charting-library-docs/latest/api/interfaces/Broker.PlacedOrder)
  * [PlacedOrderBase](/charting-library-docs/latest/api/interfaces/Broker.PlacedOrderBase)
  * [Position](/charting-library-docs/latest/api/interfaces/Broker.Position)
  * [PositionBase](/charting-library-docs/latest/api/interfaces/Broker.PositionBase)
  * [PositionDialogOptions](/charting-library-docs/latest/api/interfaces/Broker.PositionDialogOptions)
  * [PositiveBaseInputFieldValidatorResult](/charting-library-docs/latest/api/interfaces/Broker.PositiveBaseInputFieldValidatorResult)
  * [PreOrder](/charting-library-docs/latest/api/interfaces/Broker.PreOrder)
  * [PriceFormatterFormatOptions](/charting-library-docs/latest/api/interfaces/Broker.PriceFormatterFormatOptions)
  * [QuantityMetainfo](/charting-library-docs/latest/api/interfaces/Broker.QuantityMetainfo)
  * [SingleBrokerMetaInfo](/charting-library-docs/latest/api/interfaces/Broker.SingleBrokerMetaInfo)
  * [SortingParameters](/charting-library-docs/latest/api/interfaces/Broker.SortingParameters)
  * [StandardFormattersDependenciesMapping](/charting-library-docs/latest/api/interfaces/Broker.StandardFormattersDependenciesMapping)
  * [SuccessFormatterParseResult](/charting-library-docs/latest/api/interfaces/Broker.SuccessFormatterParseResult)
  * [SymbolFormatterProperties](/charting-library-docs/latest/api/interfaces/Broker.SymbolFormatterProperties)
  * [SymbolSpecificTradingOptions](/charting-library-docs/latest/api/interfaces/Broker.SymbolSpecificTradingOptions)
  * [SymbolValueFormatterFormatOptions](/charting-library-docs/latest/api/interfaces/Broker.SymbolValueFormatterFormatOptions)
  * [TableFormatterInputs](/charting-library-docs/latest/api/interfaces/Broker.TableFormatterInputs)
  * [TextFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Broker.TextFieldMetaInfo)
  * [TextWithCheckboxFieldCustomInfo](/charting-library-docs/latest/api/interfaces/Broker.TextWithCheckboxFieldCustomInfo)
  * [TextWithCheckboxFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Broker.TextWithCheckboxFieldMetaInfo)
  * [TextWithCheckboxValue](/charting-library-docs/latest/api/interfaces/Broker.TextWithCheckboxValue)
  * [TradableSolutionsTypes](/charting-library-docs/latest/api/interfaces/Broker.TradableSolutionsTypes)
  * [TradeContext](/charting-library-docs/latest/api/interfaces/Broker.TradeContext)
  * [TradingDialogOptions](/charting-library-docs/latest/api/interfaces/Broker.TradingDialogOptions)
  * [TradingQuotes](/charting-library-docs/latest/api/interfaces/Broker.TradingQuotes)
  * [WatchedValueSubscribeOptions](/charting-library-docs/latest/api/interfaces/Broker.WatchedValueSubscribeOptions)

## Type Aliasesâ

### AccountIdâ

Æ¬ **AccountId** : [`Nominal`](/charting-library-docs/latest/api/modules/Broker# nominal)<`string`, `"AccountID"`>

* * *

### AccountManagerColumnâ

Æ¬ **AccountManagerColumn** : { [K in StandardFormatterName | FormatterName]: AccountManagerColumnBase<K> }[[`StandardFormatterName`](/charting-library-docs/latest/api/enums/Broker.StandardFormatterName) | [`FormatterName`](/charting-library-docs/latest/api/modules/Broker# formattername)]

* * *

### ActionMetaInfoâ

Æ¬ **ActionMetaInfo** : [`ActionDescriptionWithCallback`](/charting-library-docs/latest/api/interfaces/Broker.ActionDescriptionWithCallback) | [`MenuSeparator`](/charting-library-docs/latest/api/interfaces/Broker.MenuSeparator)

Describes a single action to put it into a dropdown or a context menu.

* * *

### AskBidâ

Æ¬ **AskBid** : `Required`<`Pick`<[`TradingQuotes`](/charting-library-docs/latest/api/interfaces/Broker.TradingQuotes), `"ask"` | `"bid"`>>

The Ask and Bid quotes.

* * *

### CellAlignmentâ

Æ¬ **CellAlignment** : `"left"` | `"right"`

* * *

### ClosePositionPreviewRowâ

Æ¬ **ClosePositionPreviewRow** : [`ClosePositionPreviewRowData`](/charting-library-docs/latest/api/interfaces/Broker.ClosePositionPreviewRowData) | [`ClosePositionPreviewSeparator`](/charting-library-docs/latest/api/interfaces/Broker.ClosePositionPreviewSeparator)

* * *

### CustomFieldPossibleTypesâ

Æ¬ **CustomFieldPossibleTypes** : `"TextWithCheckBox"` | `"ComboBox"` | `"Checkbox"` | `"TextField"`

* * *

### CustomTableFormatElementFunctionâ

Æ¬ **CustomTableFormatElementFunction** <`T`>: (`inputs`: [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Broker.TableFormatterInputs)<`T`>) => `undefined` | `string` | `HTMLElement`

A function that takes an [TableFormatterInputs](/charting-library-docs/latest/api/interfaces/Broker.TableFormatterInputs) object and returns a `string` or an `HTMLElement`.

#### Type parametersâ

Name| Type  
---|---  
`T`| extends [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Broker# tableformatterinputvalues) = [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Broker# tableformatterinputvalues)  
  
#### Type declarationâ

â¸ (`inputs`): `undefined` | `string` | `HTMLElement`

##### Parametersâ

Name| Type  
---|---  
`inputs`| [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Broker.TableFormatterInputs)<`T`>  
  
##### Returnsâ

`undefined` | `string` | `HTMLElement`

* * *

### FormatterNameâ

Æ¬ **FormatterName** : [`Nominal`](/charting-library-docs/latest/api/modules/Broker# nominal)<`string`, `"FormatterName"`>

* * *

### InputFieldValidatorâ

Æ¬ **InputFieldValidator** : (`value`: `any`) => [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Broker# inputfieldvalidatorresult)

Input field validator

#### Type declarationâ

â¸ (`value`): [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Broker# inputfieldvalidatorresult)

##### Parametersâ

Name| Type| Description  
---|---|---  
`value`| `any`| value to be validated  
  
##### Returnsâ

[`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Broker# inputfieldvalidatorresult)

* * *

### InputFieldValidatorResultâ

Æ¬ **InputFieldValidatorResult** : [`PositiveBaseInputFieldValidatorResult`](/charting-library-docs/latest/api/interfaces/Broker.PositiveBaseInputFieldValidatorResult) | [`NegativeBaseInputFieldValidatorResult`](/charting-library-docs/latest/api/interfaces/Broker.NegativeBaseInputFieldValidatorResult)

* * *

### LanguageCodeâ

Æ¬ **LanguageCode** : `"ar"` | `"zh"` | `"ca_ES"` | `"en"` | `"fr"` | `"de"` | `"he_IL"` | `"id_ID"` | `"it"` | `"ja"` | `"ko"` | `"pl"` | `"pt"` | `"ru"` | `"es"` | `"sv"` | `"th"` | `"tr"` | `"vi"` | `"ms_MY"` | `"zh_TW"`

* * *

### LeverageParamsâ

Æ¬ **LeverageParams** : [`LeverageInfoParams`](/charting-library-docs/latest/api/interfaces/Broker.LeverageInfoParams) | [`LeverageSetParams`](/charting-library-docs/latest/api/interfaces/Broker.LeverageSetParams)

* * *

### MarkupTextâ

Æ¬ **MarkupText** : (`string` | [`HyperlinkInfo`](/charting-library-docs/latest/api/interfaces/Broker.HyperlinkInfo))[]

* * *

### Nominalâ

Æ¬ **Nominal** <`T`, `Name`>: `T` & { `[species]`: `Name` }

This is the generic type useful for declaring a nominal type, which does not structurally matches with the base type and the other types declared over the same base type

Usage:

**`Example`**
    
    
    type Index = Nominal<number, 'Index'>;  
    // let i: Index = 42; // this fails to compile  
    let i: Index = 42 as Index; // OK  
    

**`Example`**
    
    
    type TagName = Nominal<string, 'TagName'>;  
    

#### Type parametersâ

Name| Type  
---|---  
`T`| `T`  
`Name`| extends `string`  
  
* * *

### Orderâ

Æ¬ **Order** : [`PlacedOrder`](/charting-library-docs/latest/api/interfaces/Broker.PlacedOrder) | [`BracketOrder`](/charting-library-docs/latest/api/interfaces/Broker.BracketOrder)

* * *

### OrderPreviewMessageâ

Æ¬ **OrderPreviewMessage** : `string` | [`MarkupText`](/charting-library-docs/latest/api/modules/Broker# markuptext)

* * *

### OrderTableColumnâ

Æ¬ **OrderTableColumn** : [`AccountManagerColumn`](/charting-library-docs/latest/api/modules/Broker# accountmanagercolumn) & { `supportedStatusFilters?`: [`OrderStatusFilter`](/charting-library-docs/latest/api/enums/Broker.OrderStatusFilter)[] }

* * *

### SuggestedQtyChangedListenerâ

Æ¬ **SuggestedQtyChangedListener** : (`newQty`: `number`) => `void`

#### Type declarationâ

â¸ (`newQty`): `void`

##### Parametersâ

Name| Type  
---|---  
`newQty`| `number`  
  
##### Returnsâ

`void`

* * *

### SymbolTypeâ

Æ¬ **SymbolType** : `"stock"` | `"index"` | `"forex"` | `"futures"` | `"bitcoin"` | `"crypto"` | `"undefined"` | `"expression"` | `"spread"` | `"cfd"` | `"economic"` | `"equity"` | `"dr"` | `"bond"` | `"right"` | `"warrant"` | `"fund"` | `"structured"` | `"commodity"` | `"fundamental"` | `"spot"` | `"swap"` | `"option"`

* * *

### TableFormatTextFunctionâ

Æ¬ **TableFormatTextFunction** <`T`>: (`inputs`: [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Broker.TableFormatterInputs)<`T`>) => `string`

A function that takes an [TableFormatterInputs](/charting-library-docs/latest/api/interfaces/Broker.TableFormatterInputs) object and returns a `string`.

#### Type parametersâ

Name| Type  
---|---  
`T`| extends [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Broker# tableformatterinputvalues) = [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Broker# tableformatterinputvalues)  
  
#### Type declarationâ

â¸ (`inputs`): `string`

##### Parametersâ

Name| Type  
---|---  
`inputs`| [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Broker.TableFormatterInputs)<`T`>  
  
##### Returnsâ

`string`

* * *

### TableFormatterInputValueâ

Æ¬ **TableFormatterInputValue** : `any`

* * *

### TableFormatterInputValuesâ

Æ¬ **TableFormatterInputValues** : [`TableFormatterInputValue`](/charting-library-docs/latest/api/modules/Broker# tableformatterinputvalue)[]

* * *

### TextInputFieldValidatorâ

Æ¬ **TextInputFieldValidator** : (`value`: `string`) => [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Broker# inputfieldvalidatorresult)

#### Type declarationâ

â¸ (`value`): [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Broker# inputfieldvalidatorresult)

##### Parametersâ

Name| Type  
---|---  
`value`| `string`  
  
##### Returnsâ

[`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Broker# inputfieldvalidatorresult)

* * *

### TradableSolutionsâ

Æ¬ **TradableSolutions** : [`TradableSolutionsTypes`](/charting-library-docs/latest/api/interfaces/Broker.TradableSolutionsTypes)[keyof [`TradableSolutionsTypes`](/charting-library-docs/latest/api/interfaces/Broker.TradableSolutionsTypes)]

`TradableSolutions` has one of the following keys:

  * `changeAccount` \- id of a sub-account suitable for trading the symbol
  * `changeSymbol` \- the symbol suitable for trading with current sub-account
  * `openUrl` \- the object with URL to be opened and text for solution button

* * *

### TradingDialogCustomFieldâ

Æ¬ **TradingDialogCustomField** : [`CheckboxFieldMetaInfo`](/charting-library-docs/latest/api/interfaces/Broker.CheckboxFieldMetaInfo) | [`TextWithCheckboxFieldMetaInfo`](/charting-library-docs/latest/api/interfaces/Broker.TextWithCheckboxFieldMetaInfo) | [`CustomComboBoxMetaInfo`](/charting-library-docs/latest/api/interfaces/Broker.CustomComboBoxMetaInfo) | [`TextFieldMetaInfo`](/charting-library-docs/latest/api/interfaces/Broker.TextFieldMetaInfo)

* * *

### WatchedValueCallbackâ

Æ¬ **WatchedValueCallback** <`T`>: (`value`: `T`) => `void`

#### Type parametersâ

Name  
---  
`T`  
  
#### Type declarationâ

â¸ (`value`): `void`

##### Parametersâ

Name| Type  
---|---  
`value`| `T`  
  
##### Returnsâ

`void`


---

## Module: Charting Library | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/api/modules/Charting_Library*

  * [](/charting-library-docs/)
  * Modules
  * Charting Library

On this page

# Module: Charting Library

TradingView Advanced Charts

## Enumerationsâ

  * [ActionId](/charting-library-docs/latest/api/enums/Charting_Library.ActionId)
  * [BottomWidgetBarMode](/charting-library-docs/latest/api/enums/Charting_Library.BottomWidgetBarMode)
  * [ChartStyle](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle)
  * [ClearMarksMode](/charting-library-docs/latest/api/enums/Charting_Library.ClearMarksMode)
  * [ColorType](/charting-library-docs/latest/api/enums/Charting_Library.ColorType)
  * [ConnectionStatus](/charting-library-docs/latest/api/enums/Charting_Library.ConnectionStatus)
  * [DisconnectType](/charting-library-docs/latest/api/enums/Charting_Library.DisconnectType)
  * [FilledAreaType](/charting-library-docs/latest/api/enums/Charting_Library.FilledAreaType)
  * [HHistDirection](/charting-library-docs/latest/api/enums/Charting_Library.HHistDirection)
  * [LineStudyPlotStyle](/charting-library-docs/latest/api/enums/Charting_Library.LineStudyPlotStyle)
  * [LineStyle](/charting-library-docs/latest/api/enums/Charting_Library.LineStyle)
  * [MarkLocation](/charting-library-docs/latest/api/enums/Charting_Library.MarkLocation)
  * [MarketStatus](/charting-library-docs/latest/api/enums/Charting_Library.MarketStatus)
  * [MenuItemType](/charting-library-docs/latest/api/enums/Charting_Library.MenuItemType)
  * [NotificationType](/charting-library-docs/latest/api/enums/Charting_Library.NotificationType)
  * [OhlcStudyPlotStyle](/charting-library-docs/latest/api/enums/Charting_Library.OhlcStudyPlotStyle)
  * [OrderOrPositionMessageType](/charting-library-docs/latest/api/enums/Charting_Library.OrderOrPositionMessageType)
  * [OrderStatus](/charting-library-docs/latest/api/enums/Charting_Library.OrderStatus)
  * [OrderStatusFilter](/charting-library-docs/latest/api/enums/Charting_Library.OrderStatusFilter)
  * [OrderTicketFocusControl](/charting-library-docs/latest/api/enums/Charting_Library.OrderTicketFocusControl)
  * [OrderType](/charting-library-docs/latest/api/enums/Charting_Library.OrderType)
  * [OverrideLineStyle](/charting-library-docs/latest/api/enums/Charting_Library.OverrideLineStyle)
  * [OverridePriceAxisLastValueMode](/charting-library-docs/latest/api/enums/Charting_Library.OverridePriceAxisLastValueMode)
  * [PaneSize](/charting-library-docs/latest/api/enums/Charting_Library.PaneSize)
  * [ParentType](/charting-library-docs/latest/api/enums/Charting_Library.ParentType)
  * [PlDisplay](/charting-library-docs/latest/api/enums/Charting_Library.PlDisplay)
  * [PlotSymbolSize](/charting-library-docs/latest/api/enums/Charting_Library.PlotSymbolSize)
  * [PriceScaleMode](/charting-library-docs/latest/api/enums/Charting_Library.PriceScaleMode)
  * [SeriesType](/charting-library-docs/latest/api/enums/Charting_Library.SeriesType)
  * [Side](/charting-library-docs/latest/api/enums/Charting_Library.Side)
  * [StandardFormatterName](/charting-library-docs/latest/api/enums/Charting_Library.StandardFormatterName)
  * [StopType](/charting-library-docs/latest/api/enums/Charting_Library.StopType)
  * [StudyInputType](/charting-library-docs/latest/api/enums/Charting_Library.StudyInputType)
  * [StudyPlotDisplayTarget](/charting-library-docs/latest/api/enums/Charting_Library.StudyPlotDisplayTarget)
  * [StudyPlotType](/charting-library-docs/latest/api/enums/Charting_Library.StudyPlotType)
  * [StudyTargetPriceScale](/charting-library-docs/latest/api/enums/Charting_Library.StudyTargetPriceScale)
  * [TimeFrameType](/charting-library-docs/latest/api/enums/Charting_Library.TimeFrameType)
  * [TimeHoursFormat](/charting-library-docs/latest/api/enums/Charting_Library.TimeHoursFormat)
  * [TradedGroupHorizontalAlignment](/charting-library-docs/latest/api/enums/Charting_Library.TradedGroupHorizontalAlignment)
  * [VisibilityType](/charting-library-docs/latest/api/enums/Charting_Library.VisibilityType)

## Interfacesâ

  * [AbcdLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AbcdLineToolOverrides)
  * [AcceleratorOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AcceleratorOscillatorIndicatorOverrides)
  * [AccessList](/charting-library-docs/latest/api/interfaces/Charting_Library.AccessList)
  * [AccessListItem](/charting-library-docs/latest/api/interfaces/Charting_Library.AccessListItem)
  * [AccountManagerColumnBase](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerColumnBase)
  * [AccountManagerInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerInfo)
  * [AccountManagerPage](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerPage)
  * [AccountManagerSummaryField](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerSummaryField)
  * [AccountManagerTable](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerTable)
  * [AccountManagerTableFlags](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerTableFlags)
  * [AccountMetainfo](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountMetainfo)
  * [AccumulationDistributionIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AccumulationDistributionIndicatorOverrides)
  * [AccumulativeSwingIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AccumulativeSwingIndexIndicatorOverrides)
  * [ActionDescription](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionDescription)
  * [ActionDescriptionWithCallback](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionDescriptionWithCallback)
  * [ActionOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionOptions)
  * [ActionState](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionState)
  * [ActionsFactory](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionsFactory)
  * [AdditionalSymbolInfoField](/charting-library-docs/latest/api/interfaces/Charting_Library.AdditionalSymbolInfoField)
  * [AdvanceDeclineIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AdvanceDeclineIndicatorOverrides)
  * [AnchoredVWAPIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AnchoredVWAPIndicatorOverrides)
  * [AnchoredvpLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AnchoredvpLineToolOverrides)
  * [AnchoredvwapLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AnchoredvwapLineToolOverrides)
  * [ArcLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArcLineToolOverrides)
  * [AreaStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.AreaStylePreferences)
  * [ArnaudLegouxMovingAverageIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArnaudLegouxMovingAverageIndicatorOverrides)
  * [AroonIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AroonIndicatorOverrides)
  * [ArrowLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowLineToolOverrides)
  * [ArrowmarkdownLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkdownLineToolOverrides)
  * [ArrowmarkerLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkerLineToolOverrides)
  * [ArrowmarkleftLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkleftLineToolOverrides)
  * [ArrowmarkrightLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkrightLineToolOverrides)
  * [ArrowmarkupLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkupLineToolOverrides)
  * [AvailableZOrderOperations](/charting-library-docs/latest/api/interfaces/Charting_Library.AvailableZOrderOperations)
  * [AverageDirectionalIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AverageDirectionalIndexIndicatorOverrides)
  * [AveragePriceIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AveragePriceIndicatorOverrides)
  * [AverageTrueRangeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AverageTrueRangeIndicatorOverrides)
  * [AwesomeOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.AwesomeOscillatorIndicatorOverrides)
  * [BalanceofPowerIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BalanceofPowerIndicatorOverrides)
  * [BalloonLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BalloonLineToolOverrides)
  * [Bar](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar)
  * [BarStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.BarStylePreferences)
  * [BarspatternLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BarspatternLineToolOverrides)
  * [BaseInputFieldValidatorResult](/charting-library-docs/latest/api/interfaces/Charting_Library.BaseInputFieldValidatorResult)
  * [BaselineStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.BaselineStylePreferences)
  * [BeziercubicLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BeziercubicLineToolOverrides)
  * [BezierquadroLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BezierquadroLineToolOverrides)
  * [BollingerBandsBIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BollingerBandsBIndicatorOverrides)
  * [BollingerBandsIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BollingerBandsIndicatorOverrides)
  * [BollingerBandsWidthIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BollingerBandsWidthIndicatorOverrides)
  * [BracketOrder](/charting-library-docs/latest/api/interfaces/Charting_Library.BracketOrder)
  * [BracketOrderBase](/charting-library-docs/latest/api/interfaces/Charting_Library.BracketOrderBase)
  * [Brackets](/charting-library-docs/latest/api/interfaces/Charting_Library.Brackets)
  * [BrokerConfigFlags](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerConfigFlags)
  * [BrokerCustomUI](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerCustomUI)
  * [BrokerOrderOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerOrderOverrides)
  * [BrokerPositionOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerPositionOverrides)
  * [BrushLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.BrushLineToolOverrides)
  * [CalloutLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CalloutLineToolOverrides)
  * [CandleStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.CandleStylePreferences)
  * [ChaikinMoneyFlowIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChaikinMoneyFlowIndicatorOverrides)
  * [ChaikinOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChaikinOscillatorIndicatorOverrides)
  * [ChaikinVolatilityIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChaikinVolatilityIndicatorOverrides)
  * [ChandeKrollStopIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChandeKrollStopIndicatorOverrides)
  * [ChandeMomentumOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChandeMomentumOscillatorIndicatorOverrides)
  * [ChangeAccountSolution](/charting-library-docs/latest/api/interfaces/Charting_Library.ChangeAccountSolution)
  * [ChangeSymbolSolution](/charting-library-docs/latest/api/interfaces/Charting_Library.ChangeSymbolSolution)
  * [ChangeThemeOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.ChangeThemeOptions)
  * [ChartData](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartData)
  * [ChartDescriptionContext](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartDescriptionContext)
  * [ChartMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartMetaInfo)
  * [ChartPropertiesOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides)
  * [ChartTemplate](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartTemplate)
  * [ChartTemplateContent](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartTemplateContent)
  * [ChartingLibraryWidgetConstructor](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetConstructor)
  * [ChartingLibraryWidgetOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions)
  * [CheckboxFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.CheckboxFieldMetaInfo)
  * [ChopZoneIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChopZoneIndicatorOverrides)
  * [ChoppinessIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChoppinessIndexIndicatorOverrides)
  * [CircleLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CircleLineToolOverrides)
  * [ClientSnapshotOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.ClientSnapshotOptions)
  * [ColumnStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.ColumnStylePreferences)
  * [CommentLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CommentLineToolOverrides)
  * [CommodityChannelIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CommodityChannelIndexIndicatorOverrides)
  * [CompareIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CompareIndicatorOverrides)
  * [CompareSymbol](/charting-library-docs/latest/api/interfaces/Charting_Library.CompareSymbol)
  * [ConnorsRSIIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ConnorsRSIIndicatorOverrides)
  * [ContextMenuItem](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuItem)
  * [ContextMenuOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions)
  * [ContextMenuPosition](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuPosition)
  * [CoppockCurveIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CoppockCurveIndicatorOverrides)
  * [CorrelationCoefficientIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CorrelationCoefficientIndicatorOverrides)
  * [CorrelationLogIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CorrelationLogIndicatorOverrides)
  * [CreateAnchoredShapeOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateAnchoredShapeOptions)
  * [CreateContextMenuParams](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateContextMenuParams)
  * [CreateHTMLButtonOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateHTMLButtonOptions)
  * [CreateMultipointShapeOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateMultipointShapeOptions)
  * [CreateShapeOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateShapeOptions)
  * [CreateShapeOptionsBase](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateShapeOptionsBase)
  * [CreateStudyOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateStudyOptions)
  * [CreateStudyTemplateOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateStudyTemplateOptions)
  * [CreateTradingViewStyledButtonOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateTradingViewStyledButtonOptions)
  * [CrossHairMovedEventParams](/charting-library-docs/latest/api/interfaces/Charting_Library.CrossHairMovedEventParams)
  * [CrossHairMovedEventSource](/charting-library-docs/latest/api/interfaces/Charting_Library.CrossHairMovedEventSource)
  * [CrossHairMovedEventSourceValue](/charting-library-docs/latest/api/interfaces/Charting_Library.CrossHairMovedEventSourceValue)
  * [CrosslineLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CrosslineLineToolOverrides)
  * [CryptoBalance](/charting-library-docs/latest/api/interfaces/Charting_Library.CryptoBalance)
  * [CurrencyInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.CurrencyInfo)
  * [CurrencyItem](/charting-library-docs/latest/api/interfaces/Charting_Library.CurrencyItem)
  * [CustomAliasedTimezone](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomAliasedTimezone)
  * [CustomComboBoxItem](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomComboBoxItem)
  * [CustomComboBoxMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomComboBoxMetaInfo)
  * [CustomFieldMetaInfoBase](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomFieldMetaInfoBase)
  * [CustomFields](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomFields)
  * [CustomFormatter](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomFormatter)
  * [CustomFormatters](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomFormatters)
  * [CustomIndicator](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomIndicator)
  * [CustomInputFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomInputFieldMetaInfo)
  * [CustomInputFieldsValues](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomInputFieldsValues)
  * [CustomStatusDropDownAction](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomStatusDropDownAction)
  * [CustomStatusDropDownContent](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomStatusDropDownContent)
  * [CustomStudyFormatterFormat](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomStudyFormatterFormat)
  * [CustomTableElementFormatter](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomTableElementFormatter)
  * [CustomThemeColors](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomThemeColors)
  * [CustomThemes](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomThemes)
  * [CustomTimezoneInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomTimezoneInfo)
  * [CypherpatternLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CypherpatternLineToolOverrides)
  * [DOMData](/charting-library-docs/latest/api/interfaces/Charting_Library.DOMData)
  * [DOMLevel](/charting-library-docs/latest/api/interfaces/Charting_Library.DOMLevel)
  * [DatafeedConfiguration](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration)
  * [DatafeedQuoteValues](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedQuoteValues)
  * [DatafeedSymbolType](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedSymbolType)
  * [DefaultContextMenuActionsParams](/charting-library-docs/latest/api/interfaces/Charting_Library.DefaultContextMenuActionsParams)
  * [DefaultDropdownActionsParams](/charting-library-docs/latest/api/interfaces/Charting_Library.DefaultDropdownActionsParams)
  * [DetrendedPriceOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.DetrendedPriceOscillatorIndicatorOverrides)
  * [DialogParams](/charting-library-docs/latest/api/interfaces/Charting_Library.DialogParams)
  * [DirectionalMovementIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.DirectionalMovementIndicatorOverrides)
  * [DisconnectionInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.DisconnectionInfo)
  * [DisjointangleLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.DisjointangleLineToolOverrides)
  * [DonchianChannelsIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.DonchianChannelsIndicatorOverrides)
  * [DoubleEMAIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.DoubleEMAIndicatorOverrides)
  * [DragStartParams](/charting-library-docs/latest/api/interfaces/Charting_Library.DragStartParams)
  * [DropdownItem](/charting-library-docs/latest/api/interfaces/Charting_Library.DropdownItem)
  * [DropdownParams](/charting-library-docs/latest/api/interfaces/Charting_Library.DropdownParams)
  * [EMACrossIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.EMACrossIndicatorOverrides)
  * [EaseOfMovementIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.EaseOfMovementIndicatorOverrides)
  * [EditObjectDialogEventParams](/charting-library-docs/latest/api/interfaces/Charting_Library.EditObjectDialogEventParams)
  * [EldersForceIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.EldersForceIndexIndicatorOverrides)
  * [ElliottcorrectionLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliottcorrectionLineToolOverrides)
  * [ElliottdoublecomboLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliottdoublecomboLineToolOverrides)
  * [ElliottimpulseLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliottimpulseLineToolOverrides)
  * [ElliotttriangleLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliotttriangleLineToolOverrides)
  * [ElliotttriplecomboLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliotttriplecomboLineToolOverrides)
  * [EllipseLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.EllipseLineToolOverrides)
  * [EmojiLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.EmojiLineToolOverrides)
  * [EmojiOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.EmojiOptions)
  * [EntityInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.EntityInfo)
  * [EnvelopesIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.EnvelopesIndicatorOverrides)
  * [ErrorFormatterParseResult](/charting-library-docs/latest/api/interfaces/Charting_Library.ErrorFormatterParseResult)
  * [Exchange](/charting-library-docs/latest/api/interfaces/Charting_Library.Exchange)
  * [Execution](/charting-library-docs/latest/api/interfaces/Charting_Library.Execution)
  * [ExecutionLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ExecutionLineToolOverrides)
  * [ExportDataOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.ExportDataOptions)
  * [ExportedData](/charting-library-docs/latest/api/interfaces/Charting_Library.ExportedData)
  * [ExtendedLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ExtendedLineToolOverrides)
  * [Favorites](/charting-library-docs/latest/api/interfaces/Charting_Library.Favorites)
  * [FibchannelLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FibchannelLineToolOverrides)
  * [FibcirclesLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FibcirclesLineToolOverrides)
  * [FibretracementLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FibretracementLineToolOverrides)
  * [FibspeedresistancearcsLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FibspeedresistancearcsLineToolOverrides)
  * [FibspeedresistancefanLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FibspeedresistancefanLineToolOverrides)
  * [FibtimezoneLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FibtimezoneLineToolOverrides)
  * [FibwedgeLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FibwedgeLineToolOverrides)
  * [FiftyTwoWeekHighLowIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FiftyTwoWeekHighLowIndicatorOverrides)
  * [FisherTransformIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FisherTransformIndicatorOverrides)
  * [FivepointspatternLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FivepointspatternLineToolOverrides)
  * [FixedRangeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FixedRangeIndicatorOverrides)
  * [FlagmarkLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FlagmarkLineToolOverrides)
  * [FlatbottomLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.FlatbottomLineToolOverrides)
  * [FormatterFormatOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.FormatterFormatOptions)
  * [FormatterParseOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.FormatterParseOptions)
  * [FormatterParseResult](/charting-library-docs/latest/api/interfaces/Charting_Library.FormatterParseResult)
  * [GanncomplexLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.GanncomplexLineToolOverrides)
  * [GannfanLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.GannfanLineToolOverrides)
  * [GannfixedLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.GannfixedLineToolOverrides)
  * [GannsquareLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.GannsquareLineToolOverrides)
  * [GetNewsResponse](/charting-library-docs/latest/api/interfaces/Charting_Library.GetNewsResponse)
  * [GhostfeedLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.GhostfeedLineToolOverrides)
  * [GrayedObject](/charting-library-docs/latest/api/interfaces/Charting_Library.GrayedObject)
  * [GuppyMultipleMovingAverageIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.GuppyMultipleMovingAverageIndicatorOverrides)
  * [HHistPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.HHistPreferences)
  * [HLCAreaStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.HLCAreaStylePreferences)
  * [HeadandshouldersLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.HeadandshouldersLineToolOverrides)
  * [HeikinAshiStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.HeikinAshiStylePreferences)
  * [HiLoStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.HiLoStylePreferences)
  * [HighlighterLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.HighlighterLineToolOverrides)
  * [HistoricalVolatilityIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoricalVolatilityIndicatorOverrides)
  * [HistoryMetadata](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoryMetadata)
  * [HollowCandleStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.HollowCandleStylePreferences)
  * [HorizLinePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.HorizLinePreferences)
  * [HorzlineLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.HorzlineLineToolOverrides)
  * [HorzrayLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.HorzrayLineToolOverrides)
  * [HullMovingAverageIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.HullMovingAverageIndicatorOverrides)
  * [HyperlinkInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.HyperlinkInfo)
  * [IAction](/charting-library-docs/latest/api/interfaces/Charting_Library.IAction)
  * [IBoxedValue](/charting-library-docs/latest/api/interfaces/Charting_Library.IBoxedValue)
  * [IBoxedValueReadOnly](/charting-library-docs/latest/api/interfaces/Charting_Library.IBoxedValueReadOnly)
  * [IBrokerAccountInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerAccountInfo)
  * [IBrokerCommon](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerCommon)
  * [IBrokerConnectionAdapterFactory](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterFactory)
  * [IBrokerConnectionAdapterHost](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost)
  * [IBrokerTerminal](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal)
  * [IChartWidgetApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi)
  * [IChartingLibraryWidget](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget)
  * [IContext](/charting-library-docs/latest/api/interfaces/Charting_Library.IContext)
  * [IContextMenuRenderer](/charting-library-docs/latest/api/interfaces/Charting_Library.IContextMenuRenderer)
  * [ICustomSymbolStatusAdapter](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomSymbolStatusAdapter)
  * [ICustomSymbolStatusApi](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomSymbolStatusApi)
  * [ICustomThemesApi](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomThemesApi)
  * [IDatafeedChartApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi)
  * [IDatafeedQuotesApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi)
  * [IDelegate](/charting-library-docs/latest/api/interfaces/Charting_Library.IDelegate)
  * [IDestroyable](/charting-library-docs/latest/api/interfaces/Charting_Library.IDestroyable)
  * [IDropdownApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IDropdownApi)
  * [IExecutionLineAdapter](/charting-library-docs/latest/api/interfaces/Charting_Library.IExecutionLineAdapter)
  * [IExternalDatafeed](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalDatafeed)
  * [IExternalSaveLoadAdapter](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalSaveLoadAdapter)
  * [IFormatter](/charting-library-docs/latest/api/interfaces/Charting_Library.IFormatter)
  * [IImageStorageAdapter](/charting-library-docs/latest/api/interfaces/Charting_Library.IImageStorageAdapter)
  * [ILineDataSourceApi](/charting-library-docs/latest/api/interfaces/Charting_Library.ILineDataSourceApi)
  * [IMenuItem](/charting-library-docs/latest/api/interfaces/Charting_Library.IMenuItem)
  * [INewsApi](/charting-library-docs/latest/api/interfaces/Charting_Library.INewsApi)
  * [INonSeriesStudyBarsResult](/charting-library-docs/latest/api/interfaces/Charting_Library.INonSeriesStudyBarsResult)
  * [INonSeriesStudyResult](/charting-library-docs/latest/api/interfaces/Charting_Library.INonSeriesStudyResult)
  * [INumberFormatter](/charting-library-docs/latest/api/interfaces/Charting_Library.INumberFormatter)
  * [IObservable](/charting-library-docs/latest/api/interfaces/Charting_Library.IObservable)
  * [IObservableValue](/charting-library-docs/latest/api/interfaces/Charting_Library.IObservableValue)
  * [IObservableValueReadOnly](/charting-library-docs/latest/api/interfaces/Charting_Library.IObservableValueReadOnly)
  * [IOrderLineAdapter](/charting-library-docs/latest/api/interfaces/Charting_Library.IOrderLineAdapter)
  * [IPaneApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IPaneApi)
  * [IPineSeries](/charting-library-docs/latest/api/interfaces/Charting_Library.IPineSeries)
  * [IPositionLineAdapter](/charting-library-docs/latest/api/interfaces/Charting_Library.IPositionLineAdapter)
  * [IPriceFormatter](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceFormatter)
  * [IPriceScaleApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi)
  * [IProjectionStudyResult](/charting-library-docs/latest/api/interfaces/Charting_Library.IProjectionStudyResult)
  * [ISelectionApi](/charting-library-docs/latest/api/interfaces/Charting_Library.ISelectionApi)
  * [ISeparator](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeparator)
  * [ISeriesApi](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi)
  * [ISettingsAdapter](/charting-library-docs/latest/api/interfaces/Charting_Library.ISettingsAdapter)
  * [IShapesGroupControllerApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IShapesGroupControllerApi)
  * [IStudyApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi)
  * [ISubscription](/charting-library-docs/latest/api/interfaces/Charting_Library.ISubscription)
  * [ISymbolInstrument](/charting-library-docs/latest/api/interfaces/Charting_Library.ISymbolInstrument)
  * [ISymbolValueFormatter](/charting-library-docs/latest/api/interfaces/Charting_Library.ISymbolValueFormatter)
  * [ITimeScaleApi](/charting-library-docs/latest/api/interfaces/Charting_Library.ITimeScaleApi)
  * [ITimezoneApi](/charting-library-docs/latest/api/interfaces/Charting_Library.ITimezoneApi)
  * [IWatchListApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IWatchListApi)
  * [IWatchedValue](/charting-library-docs/latest/api/interfaces/Charting_Library.IWatchedValue)
  * [IWatchedValueReadonly](/charting-library-docs/latest/api/interfaces/Charting_Library.IWatchedValueReadonly)
  * [IWatermarkApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IWatermarkApi)
  * [IWidgetbarApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IWidgetbarApi)
  * [IchimokuCloudIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.IchimokuCloudIndicatorOverrides)
  * [IconLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.IconLineToolOverrides)
  * [IconOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.IconOptions)
  * [ImageLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ImageLineToolOverrides)
  * [IndividualPosition](/charting-library-docs/latest/api/interfaces/Charting_Library.IndividualPosition)
  * [IndividualPositionBase](/charting-library-docs/latest/api/interfaces/Charting_Library.IndividualPositionBase)
  * [InfolineLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.InfolineLineToolOverrides)
  * [InitialSettingsMap](/charting-library-docs/latest/api/interfaces/Charting_Library.InitialSettingsMap)
  * [InsidepitchforkLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.InsidepitchforkLineToolOverrides)
  * [InstrumentInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.InstrumentInfo)
  * [IsTradableResult](/charting-library-docs/latest/api/interfaces/Charting_Library.IsTradableResult)
  * [KagiStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.KagiStylePreferences)
  * [KeltnerChannelsIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.KeltnerChannelsIndicatorOverrides)
  * [KlingerOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.KlingerOscillatorIndicatorOverrides)
  * [KnowSureThingIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.KnowSureThingIndicatorOverrides)
  * [LeastSquaresMovingAverageIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.LeastSquaresMovingAverageIndicatorOverrides)
  * [LeverageInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.LeverageInfo)
  * [LeverageInfoParams](/charting-library-docs/latest/api/interfaces/Charting_Library.LeverageInfoParams)
  * [LeveragePreviewResult](/charting-library-docs/latest/api/interfaces/Charting_Library.LeveragePreviewResult)
  * [LeverageSetParams](/charting-library-docs/latest/api/interfaces/Charting_Library.LeverageSetParams)
  * [LeverageSetResult](/charting-library-docs/latest/api/interfaces/Charting_Library.LeverageSetResult)
  * [LibraryPineStudy](/charting-library-docs/latest/api/interfaces/Charting_Library.LibraryPineStudy)
  * [LibraryPineStudyConstructor](/charting-library-docs/latest/api/interfaces/Charting_Library.LibraryPineStudyConstructor)
  * [LibrarySubsessionInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySubsessionInfo)
  * [LibrarySymbolInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo)
  * [LineBreakStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.LineBreakStylePreferences)
  * [LineStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.LineStylePreferences)
  * [LineToolState](/charting-library-docs/latest/api/interfaces/Charting_Library.LineToolState)
  * [LineToolsAndGroupsLoadRequestContext](/charting-library-docs/latest/api/interfaces/Charting_Library.LineToolsAndGroupsLoadRequestContext)
  * [LineToolsAndGroupsState](/charting-library-docs/latest/api/interfaces/Charting_Library.LineToolsAndGroupsState)
  * [LineToolsGroupState](/charting-library-docs/latest/api/interfaces/Charting_Library.LineToolsGroupState)
  * [LinearRegressionCurveIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.LinearRegressionCurveIndicatorOverrides)
  * [LinearRegressionSlopeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.LinearRegressionSlopeIndicatorOverrides)
  * [LoadingScreenOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.LoadingScreenOptions)
  * [MACDIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MACDIndicatorOverrides)
  * [MACrossIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MACrossIndicatorOverrides)
  * [MAwithEMACrossIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MAwithEMACrossIndicatorOverrides)
  * [MajorityRuleIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MajorityRuleIndicatorOverrides)
  * [MappedObject](/charting-library-docs/latest/api/interfaces/Charting_Library.MappedObject)
  * [Mark](/charting-library-docs/latest/api/interfaces/Charting_Library.Mark)
  * [MarkCustomColor](/charting-library-docs/latest/api/interfaces/Charting_Library.MarkCustomColor)
  * [MassIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MassIndexIndicatorOverrides)
  * [McGinleyDynamicIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.McGinleyDynamicIndicatorOverrides)
  * [MedianPriceIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MedianPriceIndicatorOverrides)
  * [MenuSeparator](/charting-library-docs/latest/api/interfaces/Charting_Library.MenuSeparator)
  * [MomentumIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MomentumIndicatorOverrides)
  * [MoneyFlowIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MoneyFlowIndexIndicatorOverrides)
  * [MouseEventParams](/charting-library-docs/latest/api/interfaces/Charting_Library.MouseEventParams)
  * [MovingAverageAdaptiveIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageAdaptiveIndicatorOverrides)
  * [MovingAverageChannelIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageChannelIndicatorOverrides)
  * [MovingAverageDoubleIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageDoubleIndicatorOverrides)
  * [MovingAverageExponentialIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageExponentialIndicatorOverrides)
  * [MovingAverageHammingIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageHammingIndicatorOverrides)
  * [MovingAverageIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageIndicatorOverrides)
  * [MovingAverageMultipleIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageMultipleIndicatorOverrides)
  * [MovingAverageTripleIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageTripleIndicatorOverrides)
  * [MovingAverageWeightedIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageWeightedIndicatorOverrides)
  * [NegativeBaseInputFieldValidatorResult](/charting-library-docs/latest/api/interfaces/Charting_Library.NegativeBaseInputFieldValidatorResult)
  * [NetVolumeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.NetVolumeIndicatorOverrides)
  * [NewsItem](/charting-library-docs/latest/api/interfaces/Charting_Library.NewsItem)
  * [NewsProvider](/charting-library-docs/latest/api/interfaces/Charting_Library.NewsProvider)
  * [NumericFormattingParams](/charting-library-docs/latest/api/interfaces/Charting_Library.NumericFormattingParams)
  * [OnBalanceVolumeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.OnBalanceVolumeIndicatorOverrides)
  * [OpenUrlSolution](/charting-library-docs/latest/api/interfaces/Charting_Library.OpenUrlSolution)
  * [OrderDialogOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderDialogOptions)
  * [OrderDuration](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderDuration)
  * [OrderDurationMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderDurationMetaInfo)
  * [OrderLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderLineToolOverrides)
  * [OrderOrPositionMessage](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderOrPositionMessage)
  * [OrderPreviewResult](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderPreviewResult)
  * [OrderPreviewSection](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderPreviewSection)
  * [OrderPreviewSectionRow](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderPreviewSectionRow)
  * [OrderRule](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderRule)
  * [OrderTemplate](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderTemplate)
  * [OrderTemplateBase](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderTemplateBase)
  * [OrderTicketSettings](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderTicketSettings)
  * [OverlayIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverrides)
  * [OverlayIndicatorOverridesArea](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesArea)
  * [OverlayIndicatorOverridesBar](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesBar)
  * [OverlayIndicatorOverridesBaseline](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesBaseline)
  * [OverlayIndicatorOverridesCandle](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesCandle)
  * [OverlayIndicatorOverridesColumn](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesColumn)
  * [OverlayIndicatorOverridesHLCArea](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesHLCArea)
  * [OverlayIndicatorOverridesHiLo](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesHiLo)
  * [OverlayIndicatorOverridesHollowCandle](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesHollowCandle)
  * [OverlayIndicatorOverridesLine](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesLine)
  * [OverlayIndicatorOverridesLineWithMarkers](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesLineWithMarkers)
  * [OverlayIndicatorOverridesStepline](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesStepline)
  * [Overrides](/charting-library-docs/latest/api/interfaces/Charting_Library.Overrides)
  * [ParabolicSARIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ParabolicSARIndicatorOverrides)
  * [ParallelchannelLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ParallelchannelLineToolOverrides)
  * [PathLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PathLineToolOverrides)
  * [PeriodParams](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams)
  * [PineJS](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJS)
  * [PineJSStd](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd)
  * [PineStudyResultComposite](/charting-library-docs/latest/api/interfaces/Charting_Library.PineStudyResultComposite)
  * [PipValues](/charting-library-docs/latest/api/interfaces/Charting_Library.PipValues)
  * [PitchfanLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PitchfanLineToolOverrides)
  * [PitchforkLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PitchforkLineToolOverrides)
  * [PivotPointsStandardIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PivotPointsStandardIndicatorOverrides)
  * [PlaceOrderResult](/charting-library-docs/latest/api/interfaces/Charting_Library.PlaceOrderResult)
  * [PlacedOrder](/charting-library-docs/latest/api/interfaces/Charting_Library.PlacedOrder)
  * [PlacedOrderBase](/charting-library-docs/latest/api/interfaces/Charting_Library.PlacedOrderBase)
  * [PlusClickParams](/charting-library-docs/latest/api/interfaces/Charting_Library.PlusClickParams)
  * [PnFStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.PnFStylePreferences)
  * [PolygonPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.PolygonPreferences)
  * [PolylineLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PolylineLineToolOverrides)
  * [Position](/charting-library-docs/latest/api/interfaces/Charting_Library.Position)
  * [PositionBase](/charting-library-docs/latest/api/interfaces/Charting_Library.PositionBase)
  * [PositionDialogOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.PositionDialogOptions)
  * [PositionLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PositionLineToolOverrides)
  * [PositionPercents](/charting-library-docs/latest/api/interfaces/Charting_Library.PositionPercents)
  * [PositiveBaseInputFieldValidatorResult](/charting-library-docs/latest/api/interfaces/Charting_Library.PositiveBaseInputFieldValidatorResult)
  * [PreOrder](/charting-library-docs/latest/api/interfaces/Charting_Library.PreOrder)
  * [PredictionLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PredictionLineToolOverrides)
  * [PriceChannelIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PriceChannelIndicatorOverrides)
  * [PriceFormatterFormatOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.PriceFormatterFormatOptions)
  * [PriceOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PriceOscillatorIndicatorOverrides)
  * [PriceVolumeTrendIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PriceVolumeTrendIndicatorOverrides)
  * [PricedPoint](/charting-library-docs/latest/api/interfaces/Charting_Library.PricedPoint)
  * [PricelabelLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.PricelabelLineToolOverrides)
  * [ProjectionLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ProjectionLineToolOverrides)
  * [QuantityMetainfo](/charting-library-docs/latest/api/interfaces/Charting_Library.QuantityMetainfo)
  * [QuoteDataResponse](/charting-library-docs/latest/api/interfaces/Charting_Library.QuoteDataResponse)
  * [QuoteErrorData](/charting-library-docs/latest/api/interfaces/Charting_Library.QuoteErrorData)
  * [QuoteOkData](/charting-library-docs/latest/api/interfaces/Charting_Library.QuoteOkData)
  * [RangeOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.RangeOptions)
  * [RankCorrelationIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RankCorrelationIndexIndicatorOverrides)
  * [RateOfChangeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RateOfChangeIndicatorOverrides)
  * [RatioIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RatioIndicatorOverrides)
  * [RawStudyMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfo)
  * [RawStudyMetaInfoBase](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfoBase)
  * [RayLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RayLineToolOverrides)
  * [RegressionTrendIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RegressionTrendIndicatorOverrides)
  * [RegressiontrendLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RegressiontrendLineToolOverrides)
  * [RelativeStrengthIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RelativeStrengthIndexIndicatorOverrides)
  * [RelativeVigorIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RelativeVigorIndexIndicatorOverrides)
  * [RelativeVolatilityIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RelativeVolatilityIndexIndicatorOverrides)
  * [RenkoStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.RenkoStylePreferences)
  * [RestBrokerConnectionInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.RestBrokerConnectionInfo)
  * [RiskrewardlongLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RiskrewardlongLineToolOverrides)
  * [RiskrewardshortLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RiskrewardshortLineToolOverrides)
  * [RotatedrectangleLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.RotatedrectangleLineToolOverrides)
  * [RssNewsFeedInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.RssNewsFeedInfo)
  * [RssNewsFeedParams](/charting-library-docs/latest/api/interfaces/Charting_Library.RssNewsFeedParams)
  * [SMIErgodicIndicatorOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SMIErgodicIndicatorOscillatorIndicatorOverrides)
  * [SaveChartErrorInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.SaveChartErrorInfo)
  * [SaveChartOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.SaveChartOptions)
  * [SaveChartToServerOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.SaveChartToServerOptions)
  * [SaveLoadChartRecord](/charting-library-docs/latest/api/interfaces/Charting_Library.SaveLoadChartRecord)
  * [SavedStateMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.SavedStateMetaInfo)
  * [Schiffpitchfork2LineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.Schiffpitchfork2LineToolOverrides)
  * [SchiffpitchforkLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SchiffpitchforkLineToolOverrides)
  * [SearchSymbolResultItem](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem)
  * [SeriesFieldDescriptor](/charting-library-docs/latest/api/interfaces/Charting_Library.SeriesFieldDescriptor)
  * [SeriesPreferencesMap](/charting-library-docs/latest/api/interfaces/Charting_Library.SeriesPreferencesMap)
  * [SessionsIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SessionsIndicatorOverrides)
  * [SetResolutionOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.SetResolutionOptions)
  * [SetSymbolOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.SetSymbolOptions)
  * [SetVisibleRangeOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.SetVisibleRangeOptions)
  * [SignpostLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SignpostLineToolOverrides)
  * [SinelineLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SinelineLineToolOverrides)
  * [SingleBrokerMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.SingleBrokerMetaInfo)
  * [SmoothedMovingAverageIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SmoothedMovingAverageIndicatorOverrides)
  * [SortingParameters](/charting-library-docs/latest/api/interfaces/Charting_Library.SortingParameters)
  * [SpreadIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SpreadIndicatorOverrides)
  * [StandardDeviationIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StandardDeviationIndicatorOverrides)
  * [StandardErrorBandsIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StandardErrorBandsIndicatorOverrides)
  * [StandardErrorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StandardErrorIndicatorOverrides)
  * [StandardFormattersDependenciesMapping](/charting-library-docs/latest/api/interfaces/Charting_Library.StandardFormattersDependenciesMapping)
  * [StickedPoint](/charting-library-docs/latest/api/interfaces/Charting_Library.StickedPoint)
  * [StickerLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StickerLineToolOverrides)
  * [StochasticIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StochasticIndicatorOverrides)
  * [StochasticRSIIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StochasticRSIIndicatorOverrides)
  * [StudyArrowsPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyArrowsPlotInfo)
  * [StudyArrowsPlotPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyArrowsPlotPreferences)
  * [StudyBandBackgroundPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBandBackgroundPreferences)
  * [StudyBandInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBandInfo)
  * [StudyBandPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBandPreferences)
  * [StudyBandStyle](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBandStyle)
  * [StudyBarColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBarColorerPlotInfo)
  * [StudyBarTimeInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBarTimeInputInfo)
  * [StudyBgColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBgColorerPlotInfo)
  * [StudyBooleanInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBooleanInputInfo)
  * [StudyCandleBorderColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCandleBorderColorerPlotInfo)
  * [StudyCandleWickColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCandleWickColorerPlotInfo)
  * [StudyCharsPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCharsPlotInfo)
  * [StudyCharsPlotPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCharsPlotPreferences)
  * [StudyColorInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyColorInputInfo)
  * [StudyColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyColorerPlotInfo)
  * [StudyDataOffsetPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDataOffsetPlotInfo)
  * [StudyDataPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDataPlotInfo)
  * [StudyDefaults](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDefaults)
  * [StudyDownColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDownColorerPlotInfo)
  * [StudyFieldDescriptor](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFieldDescriptor)
  * [StudyFilledAreaGradientColorStyle](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFilledAreaGradientColorStyle)
  * [StudyFilledAreaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFilledAreaInfo)
  * [StudyFilledAreaSolidColorStyle](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFilledAreaSolidColorStyle)
  * [StudyFilledAreaStyleBase](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFilledAreaStyleBase)
  * [StudyGraphicsDefaults](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyGraphicsDefaults)
  * [StudyInputBaseInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyInputBaseInfo)
  * [StudyInputInformation](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyInputInformation)
  * [StudyInputOptionsTitles](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyInputOptionsTitles)
  * [StudyInputValueItem](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyInputValueItem)
  * [StudyInputsSimple](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyInputsSimple)
  * [StudyLinePlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyLinePlotInfo)
  * [StudyLinePlotPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyLinePlotPreferences)
  * [StudyNumericInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyNumericInputInfo)
  * [StudyOhlcColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcColorerPlotInfo)
  * [StudyOhlcPlotBarsStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcPlotBarsStylePreferences)
  * [StudyOhlcPlotBaseStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcPlotBaseStylePreferences)
  * [StudyOhlcPlotCandlesStylePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcPlotCandlesStylePreferences)
  * [StudyOhlcPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcPlotInfo)
  * [StudyOhlcStylesInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcStylesInfo)
  * [StudyOrDrawingAddedToChartEventParams](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOrDrawingAddedToChartEventParams)
  * [StudyOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOverrides)
  * [StudyPaletteColor](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPaletteColor)
  * [StudyPaletteColorPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPaletteColorPreferences)
  * [StudyPaletteInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPaletteInfo)
  * [StudyPalettePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPalettePreferences)
  * [StudyPaletteStyle](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPaletteStyle)
  * [StudyPalettedPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPalettedPlotInfo)
  * [StudyPalettesInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPalettesInfo)
  * [StudyPlotBaseInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPlotBaseInfo)
  * [StudyPlotBasePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPlotBasePreferences)
  * [StudyPlotValueInheritFormat](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPlotValueInheritFormat)
  * [StudyPlotValuePrecisionFormat](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPlotValuePrecisionFormat)
  * [StudyPriceInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPriceInputInfo)
  * [StudyResolutionInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyResolutionInputInfo)
  * [StudyResultValueWithOffset](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyResultValueWithOffset)
  * [StudyRgbaColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyRgbaColorerPlotInfo)
  * [StudySessionInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySessionInputInfo)
  * [StudyShapesPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyShapesPlotInfo)
  * [StudyShapesPlotPreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyShapesPlotPreferences)
  * [StudySourceInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySourceInputInfo)
  * [StudyStyleInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyStyleInfo)
  * [StudyStyleInfoDefaults](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyStyleInfoDefaults)
  * [StudyStyleValues](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyStyleValues)
  * [StudyStylesInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyStylesInfo)
  * [StudySymbolInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySymbolInputInfo)
  * [StudyTargetedPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTargetedPlotInfo)
  * [StudyTemplateData](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTemplateData)
  * [StudyTemplateMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTemplateMetaInfo)
  * [StudyTextColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextColorerPlotInfo)
  * [StudyTextInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextInputInfo)
  * [StudyTextareaInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextareaInputInfo)
  * [StudyTimeInputInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTimeInputInfo)
  * [StudyUpColorerPlotInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyUpColorerPlotInfo)
  * [StyledText](/charting-library-docs/latest/api/interfaces/Charting_Library.StyledText)
  * [SubscribeEventsMap](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap)
  * [SuccessFormatterParseResult](/charting-library-docs/latest/api/interfaces/Charting_Library.SuccessFormatterParseResult)
  * [SuperTrendIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.SuperTrendIndicatorOverrides)
  * [SymbolExt](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolExt)
  * [SymbolFormatterProperties](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolFormatterProperties)
  * [SymbolInfoPriceSource](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolInfoPriceSource)
  * [SymbolInputSymbolSource](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolInputSymbolSource)
  * [SymbolIntervalResult](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolIntervalResult)
  * [SymbolResolveExtension](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolResolveExtension)
  * [SymbolSearchCompleteData](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolSearchCompleteData)
  * [SymbolSpecificTradingOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolSpecificTradingOptions)
  * [SymbolValueFormatterFormatOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolValueFormatterFormatOptions)
  * [TRIXIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TRIXIndicatorOverrides)
  * [TableFormatterInputs](/charting-library-docs/latest/api/interfaces/Charting_Library.TableFormatterInputs)
  * [TextFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.TextFieldMetaInfo)
  * [TextLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TextLineToolOverrides)
  * [TextWithCheckboxFieldCustomInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.TextWithCheckboxFieldCustomInfo)
  * [TextWithCheckboxFieldMetaInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.TextWithCheckboxFieldMetaInfo)
  * [TextWithCheckboxValue](/charting-library-docs/latest/api/interfaces/Charting_Library.TextWithCheckboxValue)
  * [TextabsoluteLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TextabsoluteLineToolOverrides)
  * [ThreedriversLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ThreedriversLineToolOverrides)
  * [TimeFieldDescriptor](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFieldDescriptor)
  * [TimeFrameItem](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFrameItem)
  * [TimeFramePeriodBack](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFramePeriodBack)
  * [TimeFrameTimeRange](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFrameTimeRange)
  * [TimePoint](/charting-library-docs/latest/api/interfaces/Charting_Library.TimePoint)
  * [TimeScaleOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeScaleOptions)
  * [TimecyclesLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TimecyclesLineToolOverrides)
  * [TimescaleMark](/charting-library-docs/latest/api/interfaces/Charting_Library.TimescaleMark)
  * [TimezoneInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.TimezoneInfo)
  * [TradableSolutionsTypes](/charting-library-docs/latest/api/interfaces/Charting_Library.TradableSolutionsTypes)
  * [TradeContext](/charting-library-docs/latest/api/interfaces/Charting_Library.TradeContext)
  * [TradingCustomization](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingCustomization)
  * [TradingDialogOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingDialogOptions)
  * [TradingQuotes](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingQuotes)
  * [TradingTerminalWidgetOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions)
  * [TrendStrengthIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendStrengthIndexIndicatorOverrides)
  * [TrendangleLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendangleLineToolOverrides)
  * [TrendbasedfibextensionLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendbasedfibextensionLineToolOverrides)
  * [TrendbasedfibtimeLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendbasedfibtimeLineToolOverrides)
  * [TrendlineLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendlineLineToolOverrides)
  * [TriangleLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TriangleLineToolOverrides)
  * [TrianglepatternLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TrianglepatternLineToolOverrides)
  * [TripleEMAIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TripleEMAIndicatorOverrides)
  * [TrueStrengthIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TrueStrengthIndexIndicatorOverrides)
  * [TypicalPriceIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.TypicalPriceIndicatorOverrides)
  * [UltimateOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.UltimateOscillatorIndicatorOverrides)
  * [UndoOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.UndoOptions)
  * [UndoRedoState](/charting-library-docs/latest/api/interfaces/Charting_Library.UndoRedoState)
  * [Unit](/charting-library-docs/latest/api/interfaces/Charting_Library.Unit)
  * [UnitInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.UnitInfo)
  * [UserTimeFieldDescriptor](/charting-library-docs/latest/api/interfaces/Charting_Library.UserTimeFieldDescriptor)
  * [VWAPIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VWAPIndicatorOverrides)
  * [VWMAIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VWMAIndicatorOverrides)
  * [ValueByStyleId](/charting-library-docs/latest/api/interfaces/Charting_Library.ValueByStyleId)
  * [VertLinePreferences](/charting-library-docs/latest/api/interfaces/Charting_Library.VertLinePreferences)
  * [VertlineLineToolOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VertlineLineToolOverrides)
  * [VisiblePriceRange](/charting-library-docs/latest/api/interfaces/Charting_Library.VisiblePriceRange)
  * [VisibleTimeRange](/charting-library-docs/latest/api/interfaces/Charting_Library.VisibleTimeRange)
  * [VolatilityClosetoCloseIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityClosetoCloseIndicatorOverrides)
  * [VolatilityIndexIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityIndexIndicatorOverrides)
  * [VolatilityOHLCIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityOHLCIndicatorOverrides)
  * [VolatilityZeroTrendClosetoCloseIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityZeroTrendClosetoCloseIndicatorOverrides)
  * [VolumeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeIndicatorOverrides)
  * [VolumeOscillatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeOscillatorIndicatorOverrides)
  * [VolumeProfileFixedRangeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeProfileFixedRangeIndicatorOverrides)
  * [VolumeProfileVisibleRangeIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeProfileVisibleRangeIndicatorOverrides)
  * [VortexIndicatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.VortexIndicatorIndicatorOverrides)
  * [WatchListSymbolList](/charting-library-docs/latest/api/interfaces/Charting_Library.WatchListSymbolList)
  * [WatchListSymbolListData](/charting-library-docs/latest/api/interfaces/Charting_Library.WatchListSymbolListData)
  * [WatchListSymbolListMap](/charting-library-docs/latest/api/interfaces/Charting_Library.WatchListSymbolListMap)
  * [WatchedValueSubscribeOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.WatchedValueSubscribeOptions)
  * [WatchlistSettings](/charting-library-docs/latest/api/interfaces/Charting_Library.WatchlistSettings)
  * [WatermarkContentData](/charting-library-docs/latest/api/interfaces/Charting_Library.WatermarkContentData)
  * [WatermarkLine](/charting-library-docs/latest/api/interfaces/Charting_Library.WatermarkLine)
  * [WidgetBarParams](/charting-library-docs/latest/api/interfaces/Charting_Library.WidgetBarParams)
  * [WilliamsAlligatorIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.WilliamsAlligatorIndicatorOverrides)
  * [WilliamsFractalIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.WilliamsFractalIndicatorOverrides)
  * [WilliamsRIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.WilliamsRIndicatorOverrides)
  * [ZigZagIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ZigZagIndicatorOverrides)

## Type Aliasesâ

### AccountIdâ

Æ¬ **AccountId** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`string`, `"AccountID"`>

* * *

### AccountManagerColumnâ

Æ¬ **AccountManagerColumn** : { [K in StandardFormatterName | FormatterName]: AccountManagerColumnBase<K> }[[`StandardFormatterName`](/charting-library-docs/latest/api/enums/Charting_Library.StandardFormatterName) | [`FormatterName`](/charting-library-docs/latest/api/modules/Charting_Library# formattername)]

* * *

### ActionMetaInfoâ

Æ¬ **ActionMetaInfo** : [`ActionDescriptionWithCallback`](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionDescriptionWithCallback) | [`MenuSeparator`](/charting-library-docs/latest/api/interfaces/Charting_Library.MenuSeparator)

Describes a single action to put it into a dropdown or a context menu.

* * *

### AskBidâ

Æ¬ **AskBid** : `Required`<`Pick`<[`TradingQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingQuotes), `"ask"` | `"bid"`>>

The Ask and Bid quotes.

* * *

### AvailableSaveloadVersionsâ

Æ¬ **AvailableSaveloadVersions** : `"1.0"` | `"1.1"`

* * *

### BrokerDebugModeâ

Æ¬ **BrokerDebugMode** : `"all"` | `"normal"` | `"host-only"` | `"broker-only"`

Sets the debug level for [TradingTerminalWidgetOptions.debug_broker](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# debug_broker).

  * `host-only`: logs only messages related to the [IBrokerConnectionAdapterHost](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost) interface.
  * `broker-only`: logs only messages related to the [IBrokerTerminal](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal) interface.
  * `normal`: logs messages for the broker and host but excludes frequently called methods, such as `connectionStatus`.
  * `all`: logs all possible debug messages.

* * *

### CellAlignmentâ

Æ¬ **CellAlignment** : `"left"` | `"right"`

* * *

### ChartActionIdâ

Æ¬ **ChartActionId** : `"chartProperties"` | `"compareOrAdd"` | `"scalesProperties"` | `"paneObjectTree"` | `"insertIndicator"` | `"symbolSearch"` | `"changeInterval"` | `"timeScaleReset"` | `"chartReset"` | `"seriesHide"` | `"studyHide"` | `"lineToggleLock"` | `"lineHide"` | `"scaleSeriesOnly"` | `"drawingToolbarAction"` | `"stayInDrawingModeAction"` | `"hideAllMarks"` | `"showCountdown"` | `"showSeriesLastValue"` | `"showSymbolLabelsAction"` | `"showStudyLastValue"` | `"showStudyPlotNamesAction"` | `"undo"` | `"redo"` | `"paneRemoveAllStudiesDrawingTools"` | `"showSymbolInfoDialog"`

A chart action ID.

* * *

### ChartDescriptorFunctionâ

Æ¬ **ChartDescriptorFunction** : (`context`: [`ChartDescriptionContext`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartDescriptionContext)) => `Promise`<`string` | `null`>

Function to provide a description of the chart described by the context data

#### Type declarationâ

â¸ (`context`): `Promise`<`string` | `null`>

##### Parametersâ

Name| Type  
---|---  
`context`| [`ChartDescriptionContext`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartDescriptionContext)  
  
##### Returnsâ

`Promise`<`string` | `null`>

* * *

### ChartTypeFavoritesâ

Æ¬ **ChartTypeFavorites** : `"Area"` | `"Bars"` | `"Candles"` | `"Heiken Ashi"` | `"Hollow Candles"` | `"Line"` | `"Line Break"` | `"Baseline"` | `"LineWithMarkers"` | `"Stepline"` | `"Columns"` | `"High-low"`

Chart type names for use within the `favorites` Widget Constructor option. This type is for Advanced Charts, if you are looking for the Trading Platform type then please see [TradingTerminalChartTypeFavorites](/charting-library-docs/latest/api/modules/Charting_Library# tradingterminalcharttypefavorites).

See [Favorites](/charting-library-docs/latest/api/interfaces/Charting_Library.Favorites) for the Widget Constructor option where you can define these favorites, and [ChartingLibraryWidgetOptions.favorites](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# favorites) for the Widget Constructor option.

* * *

### ChartingLibraryFeaturesetâ

Æ¬ **ChartingLibraryFeatureset** : `"use_localstorage_for_settings"` | `"items_favoriting"` | `"save_chart_properties_to_local_storage"` | `"create_volume_indicator_by_default"` | `"create_volume_indicator_by_default_once"` | `"volume_force_overlay"` | `"right_bar_stays_on_scroll"` | `"constraint_dialogs_movement"` | `"charting_library_debug_mode"` | `"side_toolbar_in_fullscreen_mode"` | `"header_in_fullscreen_mode"` | `"disable_resolution_rebuild"` | `"chart_scroll"` | `"chart_zoom"` | `"horz_touch_drag_scroll"` | `"vert_touch_drag_scroll"` | `"mouse_wheel_scroll"` | `"pressed_mouse_move_scroll"` | `"mouse_wheel_scale"` | `"pinch_scale"` | `"axis_pressed_mouse_move_scale"` | `"low_density_bars"` | `"uppercase_instrument_names"` | `"no_min_chart_width"` | `"fix_left_edge"` | `"lock_visible_time_range_on_resize"` | `"shift_visible_range_on_new_bar"` | `"custom_resolutions"` | `"end_of_period_timescale_marks"` | `"cropped_tick_marks"` | `"study_overlay_compare_legend_option"` | `"study_symbol_ticker_description"` | `"auto_enable_symbol_labels"` | `"insert_indicator_dialog_shortcut"` | `"two_character_bar_marks_labels"` | `"confirm_overwrite_if_chart_layout_with_name_exists"` | `"determine_first_data_request_size_using_visible_range"` | `"move_logo_to_main_pane"` | `"study_templates"` | `"datasource_copypaste"` | `"seconds_resolution"` | `"tick_resolution"` | `"secondary_series_extend_time_scale"` | `"header_widget"` | `"header_symbol_search"` | `"symbol_search_hot_key"` | `"allow_arbitrary_symbol_search_input"` | `"header_resolutions"` | `"show_interval_dialog_on_key_press"` | `"header_chart_type"` | `"header_settings"` | `"header_indicators"` | `"header_compare"` | `"header_undo_redo"` | `"header_quick_search"` | `"header_screenshot"` | `"header_fullscreen_button"` | `"border_around_the_chart"` | `"header_saveload"` | `"left_toolbar"` | `"control_bar"` | `"timeframes_toolbar"` | `"legend_widget"` | `"display_legend_on_all_charts"` | `"object_tree_legend_mode"` | `"edit_buttons_in_legend"` | `"show_hide_button_in_legend"` | `"format_button_in_legend"` | `"delete_button_in_legend"` | `"context_menus"` | `"pane_context_menu"` | `"scales_context_menu"` | `"legend_context_menu"` | `"main_series_scale_menu"` | `"display_market_status"` | `"remove_library_container_border"` | `"property_pages"` | `"show_chart_property_page"` | `"chart_property_page_scales"` | `"chart_property_page_trading"` | `"chart_property_page_right_margin_editor"` | `"countdown"` | `"dont_show_boolean_study_arguments"` | `"hide_last_na_study_output"` | `"symbol_info"` | `"timezone_menu"` | `"snapshot_trading_drawings"` | `"source_selection_markers"` | `"go_to_date"` | `"adaptive_logo"` | `"show_dom_first_time"` | `"hide_left_toolbar_by_default"` | `"chart_style_hilo"` | `"chart_style_hilo_last_price"` | `"pricescale_currency"` | `"pricescale_unit"` | `"scales_date_format"` | `"popup_hints"` | `"save_shortcut"` | `"show_right_widgets_panel_by_default"` | `"show_object_tree"` | `"show_spread_operators"` | `"hide_exponentiation_spread_operator"` | `"hide_reciprocal_spread_operator"` | `"compare_symbol_search_spread_operators"` | `"studies_symbol_search_spread_operators"` | `"hide_resolution_in_legend"` | `"hide_unresolved_symbols_in_legend"` | `"show_zoom_and_move_buttons_on_touch"` | `"hide_main_series_symbol_from_indicator_legend"` | `"hide_price_scale_global_last_bar_value"` | `"show_average_close_price_line_and_label"` | `"hide_image_invalid_symbol"` | `"hide_object_tree_and_price_scale_exchange_label"` | `"scales_time_hours_format"` | `"use_na_string_for_not_available_values"` | `"pre_post_market_sessions"` | `"show_percent_option_for_right_margin"` | `"lock_visible_time_range_when_adjusting_percentage_right_margin"` | `"iframe_loading_compatibility_mode"` | `"use_last_visible_bar_value_in_legend"` | `"symbol_info_long_description"` | `"symbol_info_price_source"` | `"chart_template_storage"` | `"request_only_visible_range_on_reset"` | `"clear_price_scale_on_error_or_empty_bars"` | `"legend_inplace_edit"` | `"show_symbol_logos"` | `"show_exchange_logos"` | `"show_symbol_logo_in_legend"` | `"show_symbol_logo_for_compare_studies"` | `"always_show_legend_values_on_mobile"` | `"studies_extend_time_scale"` | `"accessible_keyboard_shortcuts"` | `"aria_detailed_chart_descriptions"` | `"aria_crosshair_price_description"` | `"saveload_separate_drawings_storage"` | `"disable_pulse_animation"` | `"iframe_loading_same_origin"` | `"library_custom_color_themes"`

This is the list of all [featuresets](/charting-library-docs/latest/customization/Featuresets) that work in Advanced Charts

* * *

### ColorGradientâ

Æ¬ **ColorGradient** : [lightness50: string, lightness100: string, lightness150: string, lightness200: string, lightness250: string, lightness300: string, lightness350: string, lightness400: string, lightness450: string, lightness500: string, lightness550: string, lightness600: string, lightness650: string, lightness700: string, lightness750: string, lightness800: string, lightness850: string, lightness900: string, lightness950: string]

A color gradient from lightest to darkest to override one of the default color theme colors.

* * *

### ColorTypesâ

Æ¬ **ColorTypes** : `"solid"` | `"gradient"`

These are defining the types for a background

* * *

### ColumnStyleBaselinePositionâ

Æ¬ **ColumnStyleBaselinePosition** : `"bottom"` | `"zero"`

Determines the baseline position for column series, either at the bottom of the pane or aligned with the price scale's zero value.

* * *

### ContextMenuItemsProcessorâ

Æ¬ **ContextMenuItemsProcessor** : (`items`: readonly [`IActionVariant`](/charting-library-docs/latest/api/modules/Charting_Library# iactionvariant)[], `actionsFactory`: [`ActionsFactory`](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionsFactory), `params`: [`CreateContextMenuParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateContextMenuParams)) => `Promise`<readonly [`IActionVariant`](/charting-library-docs/latest/api/modules/Charting_Library# iactionvariant)[]>

Context menu items processor signature

#### Type declarationâ

â¸ (`items`, `actionsFactory`, `params`): `Promise`<readonly [`IActionVariant`](/charting-library-docs/latest/api/modules/Charting_Library# iactionvariant)[]>

##### Parametersâ

Name| Type| Description  
---|---|---  
`items`| readonly [`IActionVariant`](/charting-library-docs/latest/api/modules/Charting_Library# iactionvariant)[]| an array of items the library wants to display  
`actionsFactory`| [`ActionsFactory`](/charting-library-docs/latest/api/interfaces/Charting_Library.ActionsFactory)| factory you could use to create a new items for the context menu.  
`params`| [`CreateContextMenuParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateContextMenuParams)| an object representing additional information about the context menu, such as the menu name.  
  
##### Returnsâ

`Promise`<readonly [`IActionVariant`](/charting-library-docs/latest/api/modules/Charting_Library# iactionvariant)[]>

* * *

### ContextMenuRendererFactoryâ

Æ¬ **ContextMenuRendererFactory** : (`items`: readonly [`IActionVariant`](/charting-library-docs/latest/api/modules/Charting_Library# iactionvariant)[], `params`: [`CreateContextMenuParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateContextMenuParams), `onDestroy`: () => `void`) => `Promise`<[`IContextMenuRenderer`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContextMenuRenderer) | `null`>

#### Type declarationâ

â¸ (`items`, `params`, `onDestroy`): `Promise`<[`IContextMenuRenderer`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContextMenuRenderer) | `null`>

##### Parametersâ

Name| Type| Description  
---|---|---  
`items`| readonly [`IActionVariant`](/charting-library-docs/latest/api/modules/Charting_Library# iactionvariant)[]| an array of items the library wants to display  
`params`| [`CreateContextMenuParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateContextMenuParams)| an object representing where the user right-clicked on (only if there is an existing menu)  
`onDestroy`| () => `void`| function that you should call once a created menu is hidden/destroyed  
  
##### Returnsâ

`Promise`<[`IContextMenuRenderer`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContextMenuRenderer) | `null`>

* * *

### CreateButtonOptionsâ

Æ¬ **CreateButtonOptions** : [`CreateHTMLButtonOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateHTMLButtonOptions) | [`CreateTradingViewStyledButtonOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateTradingViewStyledButtonOptions)

* * *

### CustomStudyFormatterâ

Æ¬ **CustomStudyFormatter** : `Omit`<[`INumberFormatter`](/charting-library-docs/latest/api/interfaces/Charting_Library.INumberFormatter), `"parse"`>

* * *

### CustomStudyFormatterFactoryâ

Æ¬ **CustomStudyFormatterFactory** : (`format`: [`CustomStudyFormatterFormat`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomStudyFormatterFormat), `symbolInfo`: [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) | `null`, `precision`: `string` | `undefined`) => [`CustomStudyFormatter`](/charting-library-docs/latest/api/modules/Charting_Library# customstudyformatter) | `null`

Factory function that can be implemented to create custom study formatters.

#### Type declarationâ

â¸ (`format`, `symbolInfo`, `precision`): [`CustomStudyFormatter`](/charting-library-docs/latest/api/modules/Charting_Library# customstudyformatter) | `null`

##### Parametersâ

Name| Type  
---|---  
`format`| [`CustomStudyFormatterFormat`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomStudyFormatterFormat)  
`symbolInfo`| [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) | `null`  
`precision`| `string` | `undefined`  
  
##### Returnsâ

[`CustomStudyFormatter`](/charting-library-docs/latest/api/modules/Charting_Library# customstudyformatter) | `null`

* * *

### CustomTableFormatElementFunctionâ

Æ¬ **CustomTableFormatElementFunction** <`T`>: (`inputs`: [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.TableFormatterInputs)<`T`>) => `undefined` | `string` | `HTMLElement`

A function that takes an [TableFormatterInputs](/charting-library-docs/latest/api/interfaces/Charting_Library.TableFormatterInputs) object and returns a `string` or an `HTMLElement`.

#### Type parametersâ

Name| Type  
---|---  
`T`| extends [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Charting_Library# tableformatterinputvalues) = [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Charting_Library# tableformatterinputvalues)  
  
#### Type declarationâ

â¸ (`inputs`): `undefined` | `string` | `HTMLElement`

##### Parametersâ

Name| Type  
---|---  
`inputs`| [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.TableFormatterInputs)<`T`>  
  
##### Returnsâ

`undefined` | `string` | `HTMLElement`

* * *

### CustomTimezoneIdâ

Æ¬ **CustomTimezoneId** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`"CustomTimezoneId"`, `string`>

Identifier for a custom timezone (string).

* * *

### CustomTimezonesâ

Æ¬ **CustomTimezones** : `"Africa/Cairo"` | `"Africa/Casablanca"` | `"Africa/Johannesburg"` | `"Africa/Lagos"` | `"Africa/Nairobi"` | `"Africa/Tunis"` | `"America/Anchorage"` | `"America/Argentina/Buenos_Aires"` | `"America/Bogota"` | `"America/Caracas"` | `"America/Chicago"` | `"America/El_Salvador"` | `"America/Juneau"` | `"America/Lima"` | `"America/Los_Angeles"` | `"America/Mexico_City"` | `"America/New_York"` | `"America/Phoenix"` | `"America/Santiago"` | `"America/Sao_Paulo"` | `"America/Toronto"` | `"America/Vancouver"` | `"Asia/Almaty"` | `"Asia/Ashkhabad"` | `"Asia/Bahrain"` | `"Asia/Bangkok"` | `"Asia/Chongqing"` | `"Asia/Colombo"` | `"Asia/Dhaka"` | `"Asia/Dubai"` | `"Asia/Ho_Chi_Minh"` | `"Asia/Hong_Kong"` | `"Asia/Jakarta"` | `"Asia/Jerusalem"` | `"Asia/Kabul"` | `"Asia/Karachi"` | `"Asia/Kathmandu"` | `"Asia/Kolkata"` | `"Asia/Kuala_Lumpur"` | `"Asia/Kuwait"` | `"Asia/Manila"` | `"Asia/Muscat"` | `"Asia/Nicosia"` | `"Asia/Qatar"` | `"Asia/Riyadh"` | `"Asia/Seoul"` | `"Asia/Shanghai"` | `"Asia/Singapore"` | `"Asia/Taipei"` | `"Asia/Tehran"` | `"Asia/Tokyo"` | `"Asia/Yangon"` | `"Atlantic/Azores"` | `"Atlantic/Reykjavik"` | `"Australia/Adelaide"` | `"Australia/Brisbane"` | `"Australia/Perth"` | `"Australia/Sydney"` | `"Europe/Amsterdam"` | `"Europe/Athens"` | `"Europe/Belgrade"` | `"Europe/Berlin"` | `"Europe/Bratislava"` | `"Europe/Brussels"` | `"Europe/Bucharest"` | `"Europe/Budapest"` | `"Europe/Copenhagen"` | `"Europe/Dublin"` | `"Europe/Helsinki"` | `"Europe/Istanbul"` | `"Europe/Lisbon"` | `"Europe/London"` | `"Europe/Luxembourg"` | `"Europe/Madrid"` | `"Europe/Malta"` | `"Europe/Moscow"` | `"Europe/Oslo"` | `"Europe/Paris"` | `"Europe/Prague"` | `"Europe/Riga"` | `"Europe/Rome"` | `"Europe/Stockholm"` | `"Europe/Tallinn"` | `"Europe/Vienna"` | `"Europe/Vilnius"` | `"Europe/Warsaw"` | `"Europe/Zurich"` | `"Pacific/Auckland"` | `"Pacific/Chatham"` | `"Pacific/Fakaofo"` | `"Pacific/Honolulu"` | `"Pacific/Norfolk"` | `"US/Mountain"`

* * *

### CustomTranslateFunctionâ

Æ¬ **CustomTranslateFunction** : (`originalText`: `string`, `singularOriginalText`: `string`, `translatedText?`: `string`) => `string` | `null`

Custom translation function

#### Type declarationâ

â¸ (`originalText`, `singularOriginalText`, `translatedText?`): `string` | `null`

##### Parametersâ

Name| Type| Description  
---|---|---  
`originalText`| `string`| original raw text taking into account pluralization rules  
`singularOriginalText`| `string`| originalText in singular  
`translatedText?`| `string`| translated originalText  
  
##### Returnsâ

`string` | `null`

* * *

### DOMCallbackâ

Æ¬ **DOMCallback** : (`data`: [`DOMData`](/charting-library-docs/latest/api/interfaces/Charting_Library.DOMData)) => `void`

#### Type declarationâ

â¸ (`data`): `void`

##### Parametersâ

Name| Type  
---|---  
`data`| [`DOMData`](/charting-library-docs/latest/api/interfaces/Charting_Library.DOMData)  
  
##### Returnsâ

`void`

* * *

### DatafeedErrorCallbackâ

Æ¬ **DatafeedErrorCallback** : (`reason`: `string`) => `void`

#### Type declarationâ

â¸ (`reason`): `void`

##### Parametersâ

Name| Type  
---|---  
`reason`| `string`  
  
##### Returnsâ

`void`

* * *

### DateFormatâ

Æ¬ **DateFormat** : keyof typeof `dateFormatFunctions`

* * *

### DeepWriteableâ

Æ¬ **DeepWriteable** <`T`>: { -readonly [P in keyof T]: DeepWriteable<T[P]> }

#### Type parametersâ

Name  
---  
`T`  
  
* * *

### Directionâ

Æ¬ **Direction** : `"buy"` | `"sell"`

The direction of an execution line. Either buy or sell.

* * *

### DrawingEventTypeâ

Æ¬ **DrawingEventType** : `"click"` | `"move"` | `"remove"` | `"hide"` | `"show"` | `"create"` | `"properties_changed"` | `"points_changed"`

A event related to a drawing.

  * Note that the `properties_changed` event can be emitted before `create` event, and that the event isn't debounced (for example dragging a slider for a property will result in this event firing for each movement on the slider), you may want to debounce this within your code.
  * The `move` event is emitted when a drawing is moved as a whole, whilst the `points_changed` event is emitted when a single point of the drawing is moved. `points_changed` will always fire when `move` fires but not vice-versa.

* * *

### DrawingOverridesâ

Æ¬ **DrawingOverrides** : [`FivepointspatternLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FivepointspatternLineToolOverrides) | [`AbcdLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AbcdLineToolOverrides) | [`AnchoredvpLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AnchoredvpLineToolOverrides) | [`AnchoredvwapLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AnchoredvwapLineToolOverrides) | [`ArcLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArcLineToolOverrides) | [`ArrowLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowLineToolOverrides) | [`ArrowmarkdownLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkdownLineToolOverrides) | [`ArrowmarkerLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkerLineToolOverrides) | [`ArrowmarkleftLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkleftLineToolOverrides) | [`ArrowmarkrightLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkrightLineToolOverrides) | [`ArrowmarkupLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArrowmarkupLineToolOverrides) | [`BalloonLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BalloonLineToolOverrides) | [`BarspatternLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BarspatternLineToolOverrides) | [`BeziercubicLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BeziercubicLineToolOverrides) | [`BezierquadroLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BezierquadroLineToolOverrides) | [`BrushLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BrushLineToolOverrides) | [`CalloutLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CalloutLineToolOverrides) | [`CircleLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CircleLineToolOverrides) | [`CommentLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CommentLineToolOverrides) | [`CrosslineLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CrosslineLineToolOverrides) | [`CypherpatternLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CypherpatternLineToolOverrides) | [`DisjointangleLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.DisjointangleLineToolOverrides) | [`ElliottcorrectionLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliottcorrectionLineToolOverrides) | [`ElliottdoublecomboLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliottdoublecomboLineToolOverrides) | [`ElliottimpulseLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliottimpulseLineToolOverrides) | [`ElliotttriangleLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliotttriangleLineToolOverrides) | [`ElliotttriplecomboLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ElliotttriplecomboLineToolOverrides) | [`EllipseLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.EllipseLineToolOverrides) | [`EmojiLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.EmojiLineToolOverrides) | [`ExecutionLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ExecutionLineToolOverrides) | [`ExtendedLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ExtendedLineToolOverrides) | [`FibchannelLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FibchannelLineToolOverrides) | [`FibcirclesLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FibcirclesLineToolOverrides) | [`FibretracementLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FibretracementLineToolOverrides) | [`FibspeedresistancearcsLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FibspeedresistancearcsLineToolOverrides) | [`FibspeedresistancefanLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FibspeedresistancefanLineToolOverrides) | [`FibtimezoneLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FibtimezoneLineToolOverrides) | [`FibwedgeLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FibwedgeLineToolOverrides) | [`FlagmarkLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FlagmarkLineToolOverrides) | [`FlatbottomLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FlatbottomLineToolOverrides) | [`GanncomplexLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.GanncomplexLineToolOverrides) | [`GannfanLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.GannfanLineToolOverrides) | [`GannfixedLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.GannfixedLineToolOverrides) | [`GannsquareLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.GannsquareLineToolOverrides) | [`GhostfeedLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.GhostfeedLineToolOverrides) | [`HeadandshouldersLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.HeadandshouldersLineToolOverrides) | [`HighlighterLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.HighlighterLineToolOverrides) | [`HorzlineLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.HorzlineLineToolOverrides) | [`HorzrayLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.HorzrayLineToolOverrides) | [`IconLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IconLineToolOverrides) | [`ImageLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ImageLineToolOverrides) | [`InfolineLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.InfolineLineToolOverrides) | [`InsidepitchforkLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.InsidepitchforkLineToolOverrides) | [`OrderLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderLineToolOverrides) | [`ParallelchannelLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ParallelchannelLineToolOverrides) | [`PathLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PathLineToolOverrides) | [`PitchfanLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PitchfanLineToolOverrides) | [`PitchforkLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PitchforkLineToolOverrides) | [`PolylineLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PolylineLineToolOverrides) | [`PositionLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PositionLineToolOverrides) | [`PredictionLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PredictionLineToolOverrides) | [`PricelabelLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PricelabelLineToolOverrides) | [`ProjectionLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ProjectionLineToolOverrides) | [`RayLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RayLineToolOverrides) | [`RegressiontrendLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RegressiontrendLineToolOverrides) | [`RiskrewardlongLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RiskrewardlongLineToolOverrides) | [`RiskrewardshortLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RiskrewardshortLineToolOverrides) | [`RotatedrectangleLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RotatedrectangleLineToolOverrides) | [`SchiffpitchforkLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SchiffpitchforkLineToolOverrides) | [`Schiffpitchfork2LineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.Schiffpitchfork2LineToolOverrides) | [`SignpostLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SignpostLineToolOverrides) | [`SinelineLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SinelineLineToolOverrides) | [`StickerLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.StickerLineToolOverrides) | [`TextLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TextLineToolOverrides) | [`TextabsoluteLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TextabsoluteLineToolOverrides) | [`ThreedriversLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ThreedriversLineToolOverrides) | [`TimecyclesLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimecyclesLineToolOverrides) | [`TrendangleLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendangleLineToolOverrides) | [`TrendbasedfibextensionLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendbasedfibextensionLineToolOverrides) | [`TrendbasedfibtimeLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendbasedfibtimeLineToolOverrides) | [`TrendlineLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendlineLineToolOverrides) | [`TriangleLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TriangleLineToolOverrides) | [`TrianglepatternLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TrianglepatternLineToolOverrides) | [`VertlineLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VertlineLineToolOverrides)

Override properties for drawings. Refer to the [Drawing Overrides](/charting-library-docs/latest/customization/overrides/Drawings-Overrides) article for information on how to customize drawings.

The following constants are used within the default properties. You cannot use these names directly.

  * LINESTYLE
    * SOLID = 0
    * DOTTED = 1
    * DASHED = 2
    * LARGE_DASHED = 3
  * LINEEND
    * NORMAL = 0
    * ARROW = 1
    * CIRCLE = 2
  * MODE
    * BARS = 0
    * LINE = 1
    * OPENCLOSE = 2;
    * LINEOPEN = 3;
    * LINEHIGH = 4;
    * LINELOW = 5;
    * LINEHL2 = 6;
  * PITCHFORK_STYLE
    * ORIGINAL = 0
    * SCHIFF = 1
    * SCHIFF2 = 2
    * INSIDE = 3
  * STATS_POSITION
    * LEFT = 0
    * CENTER = 1
    * RIGHT = 2
  * RISK_DISPLAY_MODE
    * PERCENTAGE = 'percents'
    * MONEY = 'money'

* * *

### DrawingToolIdentifierâ

Æ¬ **DrawingToolIdentifier** : `"arrow"` | `"cursor"` | `"dot"` | `"eraser"` | `"LineTool5PointsPattern"` | `"LineToolABCD"` | `"LineToolArc"` | `"LineToolArrow"` | `"LineToolArrowMarkDown"` | `"LineToolArrowMarker"` | `"LineToolArrowMarkLeft"` | `"LineToolArrowMarkRight"` | `"LineToolArrowMarkUp"` | `"LineToolBarsPattern"` | `"LineToolBezierCubic"` | `"LineToolBezierQuadro"` | `"LineToolBrush"` | `"LineToolCallout"` | `"LineToolCircle"` | `"LineToolCircleLines"` | `"LineToolComment"` | `"LineToolCrossLine"` | `"LineToolCypherPattern"` | `"LineToolDateAndPriceRange"` | `"LineToolDateRange"` | `"LineToolDisjointAngle"` | `"LineToolElliottCorrection"` | `"LineToolElliottDoubleCombo"` | `"LineToolElliottImpulse"` | `"LineToolElliottTriangle"` | `"LineToolElliottTripleCombo"` | `"LineToolEllipse"` | `"LineToolExtended"` | `"LineToolFibChannel"` | `"LineToolFibCircles"` | `"LineToolFibRetracement"` | `"LineToolFibSpeedResistanceArcs"` | `"LineToolFibSpeedResistanceFan"` | `"LineToolFibSpiral"` | `"LineToolFibTimeZone"` | `"LineToolFibWedge"` | `"LineToolFixedRangeVolumeProfile"` | `"LineToolFlagMark"` | `"LineToolFlatBottom"` | `"LineToolGannComplex"` | `"LineToolGannFan"` | `"LineToolGannFixed"` | `"LineToolGannSquare"` | `"LineToolGhostFeed"` | `"LineToolHeadAndShoulders"` | `"LineToolHighlighter"` | `"LineToolHorzLine"` | `"LineToolHorzRay"` | `"LineToolInfoLine"` | `"LineToolInsidePitchfork"` | `"LineToolNote"` | `"LineToolNoteAbsolute"` | `"LineToolParallelChannel"` | `"LineToolPath"` | `"LineToolPitchfan"` | `"LineToolPitchfork"` | `"LineToolPolyline"` | `"LineToolPrediction"` | `"LineToolPriceLabel"` | `"LineToolTextNote"` | `"LineToolPriceRange"` | `"LineToolPriceRange"` | `"LineToolProjection"` | `"LineToolRay"` | `"LineToolRectangle"` | `"LineToolRegressionTrend"` | `"LineToolRiskRewardLong"` | `"LineToolRiskRewardShort"` | `"LineToolRotatedRectangle"` | `"LineToolSchiffPitchfork"` | `"LineToolSchiffPitchfork2"` | `"LineToolSignpost"` | `"LineToolSineLine"` | `"LineToolText"` | `"LineToolTextAbsolute"` | `"LineToolThreeDrivers"` | `"LineToolTimeCycles"` | `"LineToolTrendAngle"` | `"LineToolTrendBasedFibExtension"` | `"LineToolTrendBasedFibTime"` | `"LineToolTrendLine"` | `"LineToolTriangle"` | `"LineToolTrianglePattern"` | `"LineToolVertLine"`

* * *

### DropdownUpdateParamsâ

Æ¬ **DropdownUpdateParams** : `Partial`<`Omit`<[`DropdownParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.DropdownParams), `"align"`>>

Dropdown options which can be adjusted on an existing menu.

* * *

### EditObjectDialogObjectTypeâ

Æ¬ **EditObjectDialogObjectType** : `"mainSeries"` | `"drawing"` | `"study"` | `"other"`

* * *

### EmptyCallbackâ

Æ¬ **EmptyCallback** : () => `void`

#### Type declarationâ

â¸ (): `void`

##### Returnsâ

`void`

* * *

### EntityIdâ

Æ¬ **EntityId** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`string`, `"EntityId"`>

* * *

### FieldDescriptorâ

Æ¬ **FieldDescriptor** : [`TimeFieldDescriptor`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFieldDescriptor) | [`UserTimeFieldDescriptor`](/charting-library-docs/latest/api/interfaces/Charting_Library.UserTimeFieldDescriptor) | [`SeriesFieldDescriptor`](/charting-library-docs/latest/api/interfaces/Charting_Library.SeriesFieldDescriptor) | [`StudyFieldDescriptor`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFieldDescriptor)

Description of each field of exported data from the chart

* * *

### FinancialPeriodâ

Æ¬ **FinancialPeriod** : `"FY"` | `"FQ"` | `"FH"` | `"TTM"`

* * *

### FormatterNameâ

Æ¬ **FormatterName** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`string`, `"FormatterName"`>

* * *

### GetMarksCallbackâ

Æ¬ **GetMarksCallback** <`T`>: (`marks`: `T`[]) => `void`

#### Type parametersâ

Name  
---  
`T`  
  
#### Type declarationâ

â¸ (`marks`): `void`

##### Parametersâ

Name| Type  
---|---  
`marks`| `T`[]  
  
##### Returnsâ

`void`

* * *

### GetNewsFunctionâ

Æ¬ **GetNewsFunction** : (`symbol`: `string`, `callback`: (`response`: [`GetNewsResponse`](/charting-library-docs/latest/api/interfaces/Charting_Library.GetNewsResponse)) => `void`) => `void`

#### Type declarationâ

â¸ (`symbol`, `callback`): `void`

##### Parametersâ

Name| Type  
---|---  
`symbol`| `string`  
`callback`| (`response`: [`GetNewsResponse`](/charting-library-docs/latest/api/interfaces/Charting_Library.GetNewsResponse)) => `void`  
  
##### Returnsâ

`void`

* * *

### GmtTimezoneIdâ

Æ¬ **GmtTimezoneId** : `Etc/GMT${"+" | "-"}${number}${`:${number}` | ""}`

GMT timezone ID.

In order to conform with the POSIX style, those zone names beginning with "Etc/GMT" have their sign reversed from the standard ISO 8601 convention. In the "Etc" area, zones west of GMT have a positive sign and those east have a negative sign in their name (e.g "Etc/GMT-14" is 14 hours ahead of GMT).

* * *

### GridLinesModeâ

Æ¬ **GridLinesMode** : `"both"` | `"vert"` | `"horz"` | `"none"`

* * *

### GroupLockStateâ

Æ¬ **GroupLockState** : `"Locked"` | `"Unlocked"` | `"Partial"`

* * *

### GroupVisibilityStateâ

Æ¬ **GroupVisibilityState** : `"Visible"` | `"Invisible"` | `"Partial"`

* * *

### HeaderWidgetButtonsModeâ

Æ¬ **HeaderWidgetButtonsMode** : `"fullsize"` | `"compact"` | `"adaptive"`

Mode can be of the following:

  * `fullsize`: always full-size buttons on the top toolbar
  * `adaptive`: adaptive/auto mode (fullsize if the window width allows and icons on small windows).
  * `compact`: icons only buttons on the top toolbar (favorites won't be shown)

* * *

### HistoryCallbackâ

Æ¬ **HistoryCallback** : (`bars`: [`Bar`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar)[], `meta?`: [`HistoryMetadata`](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoryMetadata)) => `void`

#### Type declarationâ

â¸ (`bars`, `meta?`): `void`

##### Parametersâ

Name| Type  
---|---  
`bars`| [`Bar`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar)[]  
`meta?`| [`HistoryMetadata`](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoryMetadata)  
  
##### Returnsâ

`void`

* * *

### IActionVariantâ

Æ¬ **IActionVariant** : [`IAction`](/charting-library-docs/latest/api/interfaces/Charting_Library.IAction) | [`ISeparator`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeparator)

Item variants within a context menu

* * *

### IBarArrayâ

Æ¬ **IBarArray** : [`number`, `number`, `number`, `number`, `number`, `number`]

* * *

### IBasicDataFeedâ

Æ¬ **IBasicDataFeed** : [`IDatafeedChartApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi) & [`IExternalDatafeed`](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalDatafeed)

* * *

### IPineStudyResultâ

Æ¬ **IPineStudyResult** : [`IPineStudyResultTypes`](/charting-library-docs/latest/api/modules/Charting_Library# ipinestudyresulttypes)<[`IPineStudyResultSimple`](/charting-library-docs/latest/api/modules/Charting_Library# ipinestudyresultsimple)>

* * *

### IPineStudyResultSimpleâ

Æ¬ **IPineStudyResultSimple** : [`StudyPrimitiveResult`](/charting-library-docs/latest/api/modules/Charting_Library# studyprimitiveresult) | [`ISeriesStudyResult`](/charting-library-docs/latest/api/modules/Charting_Library# iseriesstudyresult) | [`INonSeriesStudyBarsResult`](/charting-library-docs/latest/api/interfaces/Charting_Library.INonSeriesStudyBarsResult) | [`IProjectionStudyResult`](/charting-library-docs/latest/api/interfaces/Charting_Library.IProjectionStudyResult) | [`INonSeriesStudyResult`](/charting-library-docs/latest/api/interfaces/Charting_Library.INonSeriesStudyResult)

* * *

### IPineStudyResultTypesâ

Æ¬ **IPineStudyResultTypes** <`TPineStudyResultSimple`>: `TPineStudyResultSimple` | [`PineStudyResultComposite`](/charting-library-docs/latest/api/interfaces/Charting_Library.PineStudyResultComposite)<`TPineStudyResultSimple`>

#### Type parametersâ

Name  
---  
`TPineStudyResultSimple`  
  
* * *

### IProjectionBarâ

Æ¬ **IProjectionBar** : [`number`, `number`, `number`, `number`, `number`, `number`] | [`number`, `number`, `number`, `number`, `number`, `number`, `number`]

* * *

### ISeriesStudyResultâ

Æ¬ **ISeriesStudyResult** : [time: number, open: number, high: number, low: number, close: number, volume: number, updatetime: number | undefined, isBarClosed: boolean | undefined, emptyBars: number[] | undefined, emptyBarsPrice: number | undefined]

An array of bar values.

[time, open, high, low, close, volume, updatetime, isBarClosed, emptyBars, emptyBarsPrice]

* * *

### InputFieldValidatorâ

Æ¬ **InputFieldValidator** : (`value`: `any`) => [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Charting_Library# inputfieldvalidatorresult)

Input field validator

#### Type declarationâ

â¸ (`value`): [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Charting_Library# inputfieldvalidatorresult)

##### Parametersâ

Name| Type| Description  
---|---|---  
`value`| `any`| value to be validated  
  
##### Returnsâ

[`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Charting_Library# inputfieldvalidatorresult)

* * *

### InputFieldValidatorResultâ

Æ¬ **InputFieldValidatorResult** : [`PositiveBaseInputFieldValidatorResult`](/charting-library-docs/latest/api/interfaces/Charting_Library.PositiveBaseInputFieldValidatorResult) | [`NegativeBaseInputFieldValidatorResult`](/charting-library-docs/latest/api/interfaces/Charting_Library.NegativeBaseInputFieldValidatorResult)

* * *

### LanguageCodeâ

Æ¬ **LanguageCode** : `"ar"` | `"zh"` | `"ca_ES"` | `"en"` | `"fr"` | `"de"` | `"he_IL"` | `"id_ID"` | `"it"` | `"ja"` | `"ko"` | `"pl"` | `"pt"` | `"ru"` | `"es"` | `"sv"` | `"th"` | `"tr"` | `"vi"` | `"ms_MY"` | `"zh_TW"`

* * *

### LayoutTypeâ

Æ¬ **LayoutType** : [`SingleChartLayoutType`](/charting-library-docs/latest/api/modules/Charting_Library# singlechartlayouttype) | [`MultipleChartsLayoutType`](/charting-library-docs/latest/api/modules/Charting_Library# multiplechartslayouttype)

* * *

### LegendModeâ

Æ¬ **LegendMode** : `"horizontal"` | `"vertical"`

* * *

### LibrarySessionIdâ

Æ¬ **LibrarySessionId** : `"regular"` | `"extended"` | `"premarket"` | `"postmarket"`

* * *

### LineStudyPlotStyleNameâ

Æ¬ **LineStudyPlotStyleName** : `"line"` | `"histogram"` | `"cross"` | `"area"` | `"columns"` | `"circles"` | `"line_with_breaks"` | `"area_with_breaks"` | `"step_line"` | `"step_line_with_breaks"` | `"step_line_with_diamonds"`

Plot Style. Used for `plottype` properties within [Indicator overrides](/charting-library-docs/latest/customization/overrides/indicator-overrides).

* * *

### LineToolsAndGroupsLoadRequestTypeâ

Æ¬ **LineToolsAndGroupsLoadRequestType** : `"allLineTools"` | `"lineToolsWithoutSymbol"` | `"studiesLineTools"` | `"mainSeriesLineTools"`

The type of data being requested from the [IExternalSaveLoadAdapter.loadLineToolsAndGroups](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalSaveLoadAdapter# loadlinetoolsandgroups) method.

Usually, the 'mainSeriesLineTools' is the requested type that is important for implementing the restoration of drawings associated with a chart.

* * *

### MarkConstColorsâ

Æ¬ **MarkConstColors** : `"red"` | `"green"` | `"blue"` | `"yellow"`

* * *

### MarkupTextâ

Æ¬ **MarkupText** : (`string` | [`HyperlinkInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.HyperlinkInfo))[]

* * *

### MultipleChartsLayoutTypeâ

Æ¬ **MultipleChartsLayoutType** : `"2h"` | `"2v"` | `"2-1"` | `"3s"` | `"3h"` | `"3v"` | `"4"` | `"6"` | `"8"` | `"1-2"` | `"3r"` | `"4h"` | `"4v"` | `"4s"` | `"4s-l"` | `"5h"` | `"5v"` | `"6h"` | `"6v"` | `"7h"` | `"8h"` | `"8v"` | `"1-3"` | `"2-2"` | `"2-2-l"` | `"2-3"` | `"3-2"` | `"1-4"` | `"5s"` | `"6c"` | `"2-4"` | `"8c"`

* * *

### Nominalâ

Æ¬ **Nominal** <`T`, `Name`>: `T` & { `[species]`: `Name` }

This is the generic type useful for declaring a nominal type, which does not structurally matches with the base type and the other types declared over the same base type

Usage:

**`Example`**
    
    
    type Index = Nominal<number, 'Index'>;  
    // let i: Index = 42; // this fails to compile  
    let i: Index = 42 as Index; // OK  
    

**`Example`**
    
    
    type TagName = Nominal<string, 'TagName'>;  
    

#### Type parametersâ

Name| Type  
---|---  
`T`| `T`  
`Name`| extends `string`  
  
* * *

### OmitActionIdâ

Æ¬ **OmitActionId** <`T`>: `Omit`<`T`, `"actionId"`>

#### Type parametersâ

Name| Type  
---|---  
`T`| extends `Object`  
  
* * *

### OnActionExecuteHandlerâ

Æ¬ **OnActionExecuteHandler** : (`action`: [`IAction`](/charting-library-docs/latest/api/interfaces/Charting_Library.IAction)) => `void`

#### Type declarationâ

â¸ (`action`): `void`

##### Parametersâ

Name| Type  
---|---  
`action`| [`IAction`](/charting-library-docs/latest/api/interfaces/Charting_Library.IAction)  
  
##### Returnsâ

`void`

* * *

### OnActionUpdateHandlerâ

Æ¬ **OnActionUpdateHandler** : (`action`: [`IAction`](/charting-library-docs/latest/api/interfaces/Charting_Library.IAction)) => `void`

#### Type declarationâ

â¸ (`action`): `void`

##### Parametersâ

Name| Type  
---|---  
`action`| [`IAction`](/charting-library-docs/latest/api/interfaces/Charting_Library.IAction)  
  
##### Returnsâ

`void`

* * *

### OnReadyCallbackâ

Æ¬ **OnReadyCallback** : (`configuration`: [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration)) => `void`

#### Type declarationâ

â¸ (`configuration`): `void`

##### Parametersâ

Name| Type  
---|---  
`configuration`| [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration)  
  
##### Returnsâ

`void`

* * *

### Orderâ

Æ¬ **Order** : [`PlacedOrder`](/charting-library-docs/latest/api/interfaces/Charting_Library.PlacedOrder) | [`BracketOrder`](/charting-library-docs/latest/api/interfaces/Charting_Library.BracketOrder)

* * *

### OrderLineLengthUnitâ

Æ¬ **OrderLineLengthUnit** : `"pixel"` | `"percentage"`

* * *

### OrderPreviewMessageâ

Æ¬ **OrderPreviewMessage** : `string` | [`MarkupText`](/charting-library-docs/latest/api/modules/Charting_Library# markuptext)

* * *

### OrderTableColumnâ

Æ¬ **OrderTableColumn** : [`AccountManagerColumn`](/charting-library-docs/latest/api/modules/Charting_Library# accountmanagercolumn) & { `supportedStatusFilters?`: [`OrderStatusFilter`](/charting-library-docs/latest/api/enums/Charting_Library.OrderStatusFilter)[] }

* * *

### OverlayIndicatorOverridesAllâ

Æ¬ **OverlayIndicatorOverridesAll** : [`OverlayIndicatorOverridesBar`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesBar) | [`OverlayIndicatorOverridesCandle`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesCandle) | [`OverlayIndicatorOverridesLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesLine) | [`OverlayIndicatorOverridesArea`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesArea) | [`OverlayIndicatorOverridesHollowCandle`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesHollowCandle) | [`OverlayIndicatorOverridesBaseline`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesBaseline) | [`OverlayIndicatorOverridesHiLo`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesHiLo) | [`OverlayIndicatorOverridesColumn`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesColumn) | [`OverlayIndicatorOverridesHLCArea`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesHLCArea) | [`OverlayIndicatorOverridesLineWithMarkers`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesLineWithMarkers) | [`OverlayIndicatorOverridesStepline`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverridesStepline)

* * *

### OverlayIndicatorStyleExclusionsâ

Æ¬ **OverlayIndicatorStyleExclusions** : [`Renko`](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle# renko) | [`Kagi`](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle# kagi) | [`PnF`](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle# pnf) | [`LineBreak`](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle# linebreak) | [`HeikinAshi`](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle# heikinashi) | [`VolCandle`](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle# volcandle)

* * *

### PageNameâ

Æ¬ **PageName** : `"watchlist_details_news"` | `"data_window"` | `"object_tree"`

* * *

### PlotShapeIdâ

Æ¬ **PlotShapeId** : `"shape_arrow_down"` | `"shape_arrow_up"` | `"shape_circle"` | `"shape_cross"` | `"shape_xcross"` | `"shape_diamond"` | `"shape_flag"` | `"shape_square"` | `"shape_label_down"` | `"shape_label_up"` | `"shape_triangle_down"` | `"shape_triangle_up"`

Plot shape ID.

* * *

### PositionLineLengthUnitâ

Æ¬ **PositionLineLengthUnit** : `"pixel"` | `"percentage"`

* * *

### PriceSourceâ

Æ¬ **PriceSource** : `"open"` | `"high"` | `"low"` | `"close"`

* * *

### QuoteDataâ

Æ¬ **QuoteData** : [`QuoteOkData`](/charting-library-docs/latest/api/interfaces/Charting_Library.QuoteOkData) | [`QuoteErrorData`](/charting-library-docs/latest/api/interfaces/Charting_Library.QuoteErrorData)

* * *

### QuotesCallbackâ

Æ¬ **QuotesCallback** : (`data`: [`QuoteData`](/charting-library-docs/latest/api/modules/Charting_Library# quotedata)[]) => `void`

Callback to provide Quote data.

#### Type declarationâ

â¸ (`data`): `void`

##### Parametersâ

Name| Type| Description  
---|---|---  
`data`| [`QuoteData`](/charting-library-docs/latest/api/modules/Charting_Library# quotedata)[]| Quote Data  
  
##### Returnsâ

`void`

* * *

### QuotesErrorCallbackâ

Æ¬ **QuotesErrorCallback** : (`reason`: `string`) => `void`

Error callback for quote data request.

#### Type declarationâ

â¸ (`reason`): `void`

##### Parametersâ

Name| Type| Description  
---|---|---  
`reason`| `string`| message describing the reason for the error  
  
##### Returnsâ

`void`

* * *

### RawStudyMetaInfoIdâ

Æ¬ **RawStudyMetaInfoId** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`string`, `"RawStudyMetaInfoId"`>

* * *

### RawStudyMetaInformationâ

Æ¬ **RawStudyMetaInformation** : `Omit`<[`RawStudyMetaInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfo), `"defaults"` | `"plots"`> & { `defaults?`: `Readonly`<`DeepPartial`<[`StudyDefaults`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDefaults)>> ; `plots?`: readonly `Readonly`<[`StudyPlotInformation`](/charting-library-docs/latest/api/modules/Charting_Library# studyplotinformation)>[] }

* * *

### ResolutionStringâ

Æ¬ **ResolutionString** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`string`, `"ResolutionString"`>

Resolution or time interval is a time period of one bar. Advanced Charts supports tick, intraday (seconds, minutes, hours), and DWM (daily, weekly, monthly) resolutions. The table below describes how to specify different types of resolutions:

Resolution| Format| Example  
---|---|---  
Ticks| `xT`| `1T` â one tick, `5T` â five ticks, `100T` â one hundred ticks  
Seconds| `xS`| `1S` â one second  
Minutes| `x`| `1` â one minute  
Hours| `x` minutes| `60` â one hour  
Days| `xD`| `1D` â one day  
Weeks| `xW`| `1W` â one week  
Months| `xM`| `1M` â one month  
Years| `xM` months| `12M` â one year  
  
Refer to [Resolution](/charting-library-docs/latest/core_concepts/Resolution) for more information.

* * *

### ResolveCallbackâ

Æ¬ **ResolveCallback** : (`symbolInfo`: [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo)) => `void`

#### Type declarationâ

â¸ (`symbolInfo`): `void`

##### Parametersâ

Name| Type  
---|---  
`symbolInfo`| [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo)  
  
##### Returnsâ

`void`

* * *

### RssNewsFeedItemâ

Æ¬ **RssNewsFeedItem** : [`RssNewsFeedInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.RssNewsFeedInfo) | [`RssNewsFeedInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.RssNewsFeedInfo)[]

RSS news feed.

* * *

### SearchSymbolsCallbackâ

Æ¬ **SearchSymbolsCallback** : (`items`: [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem)[]) => `void`

#### Type declarationâ

â¸ (`items`): `void`

##### Parametersâ

Name| Type  
---|---  
`items`| [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem)[]  
  
##### Returnsâ

`void`

* * *

### SeriesEventTypeâ

Æ¬ **SeriesEventType** : `"price_scale_changed"`

An event related to the series. Currently the only possible value for this argument is `price_scale_changed`

* * *

### SeriesFormatâ

Æ¬ **SeriesFormat** : `"price"` | `"volume"`

* * *

### SeriesFormatterFactoryâ

Æ¬ **SeriesFormatterFactory** : (`symbolInfo`: [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) | `null`, `minTick`: `string`) => [`ISymbolValueFormatter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISymbolValueFormatter) | `null`

#### Type declarationâ

â¸ (`symbolInfo`, `minTick`): [`ISymbolValueFormatter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISymbolValueFormatter) | `null`

##### Parametersâ

Name| Type  
---|---  
`symbolInfo`| [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) | `null`  
`minTick`| `string`  
  
##### Returnsâ

[`ISymbolValueFormatter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISymbolValueFormatter) | `null`

* * *

### SeriesPriceScaleâ

Æ¬ **SeriesPriceScale** : `"new-left"` | `"new-right"` | `"no-scale"` | [`EntityId`](/charting-library-docs/latest/api/modules/Charting_Library# entityid)

Where to attach the price scale. Options are either to the `left`, `right`, next to an already existing price axis using a reference or `no scale` if there are no other scales on the main pane.

* * *

### SeriesStatusViewSymbolTextSourceâ

Æ¬ **SeriesStatusViewSymbolTextSource** : `"ticker"` | `"description"` | `"ticker-and-description"` | `"long-description"`

* * *

### ServerTimeCallbackâ

Æ¬ **ServerTimeCallback** : (`serverTime`: `number`) => `void`

#### Type declarationâ

â¸ (`serverTime`): `void`

##### Parametersâ

Name| Type  
---|---  
`serverTime`| `number`  
  
##### Returnsâ

`void`

* * *

### SetVisibleTimeRangeâ

Æ¬ **SetVisibleTimeRange** : `Omit`<[`VisibleTimeRange`](/charting-library-docs/latest/api/interfaces/Charting_Library.VisibleTimeRange), `"to"`> & `Partial`<`Pick`<[`VisibleTimeRange`](/charting-library-docs/latest/api/interfaces/Charting_Library.VisibleTimeRange), `"to"`>>

A time range to set. The end `to` value is optional.

When the optional `to` value is omitted then the value will fallback to the timestamp of the latest bar on the chart.

* * *

### ShapePointâ

Æ¬ **ShapePoint** : [`StickedPoint`](/charting-library-docs/latest/api/interfaces/Charting_Library.StickedPoint) | [`PricedPoint`](/charting-library-docs/latest/api/interfaces/Charting_Library.PricedPoint) | [`TimePoint`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimePoint)

Drawing point

* * *

### ShapesGroupIdâ

Æ¬ **ShapesGroupId** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`string`, `"ShapesGroupId"`>

* * *

### SingleChartLayoutTypeâ

Æ¬ **SingleChartLayoutType** : `"s"`

* * *

### SingleIndicatorOverridesâ

Æ¬ **SingleIndicatorOverrides** : [`FiftyTwoWeekHighLowIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FiftyTwoWeekHighLowIndicatorOverrides) | [`AcceleratorOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AcceleratorOscillatorIndicatorOverrides) | [`AccumulationDistributionIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccumulationDistributionIndicatorOverrides) | [`AccumulativeSwingIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccumulativeSwingIndexIndicatorOverrides) | [`AdvanceDeclineIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AdvanceDeclineIndicatorOverrides) | [`AnchoredVWAPIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AnchoredVWAPIndicatorOverrides) | [`ArnaudLegouxMovingAverageIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ArnaudLegouxMovingAverageIndicatorOverrides) | [`AroonIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AroonIndicatorOverrides) | [`AverageDirectionalIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AverageDirectionalIndexIndicatorOverrides) | [`AveragePriceIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AveragePriceIndicatorOverrides) | [`AverageTrueRangeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AverageTrueRangeIndicatorOverrides) | [`AwesomeOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.AwesomeOscillatorIndicatorOverrides) | [`BalanceofPowerIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BalanceofPowerIndicatorOverrides) | [`BollingerBandsIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BollingerBandsIndicatorOverrides) | [`BollingerBandsBIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BollingerBandsBIndicatorOverrides) | [`BollingerBandsWidthIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BollingerBandsWidthIndicatorOverrides) | [`ChaikinMoneyFlowIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChaikinMoneyFlowIndicatorOverrides) | [`ChaikinOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChaikinOscillatorIndicatorOverrides) | [`ChaikinVolatilityIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChaikinVolatilityIndicatorOverrides) | [`ChandeKrollStopIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChandeKrollStopIndicatorOverrides) | [`ChandeMomentumOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChandeMomentumOscillatorIndicatorOverrides) | [`ChopZoneIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChopZoneIndicatorOverrides) | [`ChoppinessIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChoppinessIndexIndicatorOverrides) | [`CommodityChannelIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CommodityChannelIndexIndicatorOverrides) | [`CompareIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CompareIndicatorOverrides) | [`ConnorsRSIIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ConnorsRSIIndicatorOverrides) | [`CoppockCurveIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CoppockCurveIndicatorOverrides) | [`CorrelationLogIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CorrelationLogIndicatorOverrides) | [`CorrelationCoefficientIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.CorrelationCoefficientIndicatorOverrides) | [`DetrendedPriceOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.DetrendedPriceOscillatorIndicatorOverrides) | [`DirectionalMovementIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.DirectionalMovementIndicatorOverrides) | [`DonchianChannelsIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.DonchianChannelsIndicatorOverrides) | [`DoubleEMAIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.DoubleEMAIndicatorOverrides) | [`EMACrossIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.EMACrossIndicatorOverrides) | [`EaseOfMovementIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.EaseOfMovementIndicatorOverrides) | [`EldersForceIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.EldersForceIndexIndicatorOverrides) | [`EnvelopesIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.EnvelopesIndicatorOverrides) | [`FisherTransformIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FisherTransformIndicatorOverrides) | [`FixedRangeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.FixedRangeIndicatorOverrides) | [`GuppyMultipleMovingAverageIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.GuppyMultipleMovingAverageIndicatorOverrides) | [`HistoricalVolatilityIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoricalVolatilityIndicatorOverrides) | [`HullMovingAverageIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.HullMovingAverageIndicatorOverrides) | [`IchimokuCloudIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IchimokuCloudIndicatorOverrides) | [`KeltnerChannelsIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.KeltnerChannelsIndicatorOverrides) | [`KlingerOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.KlingerOscillatorIndicatorOverrides) | [`KnowSureThingIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.KnowSureThingIndicatorOverrides) | [`LeastSquaresMovingAverageIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.LeastSquaresMovingAverageIndicatorOverrides) | [`LinearRegressionCurveIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.LinearRegressionCurveIndicatorOverrides) | [`LinearRegressionSlopeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.LinearRegressionSlopeIndicatorOverrides) | [`MACrossIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MACrossIndicatorOverrides) | [`MAwithEMACrossIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MAwithEMACrossIndicatorOverrides) | [`MACDIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MACDIndicatorOverrides) | [`MajorityRuleIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MajorityRuleIndicatorOverrides) | [`MassIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MassIndexIndicatorOverrides) | [`McGinleyDynamicIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.McGinleyDynamicIndicatorOverrides) | [`MedianPriceIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MedianPriceIndicatorOverrides) | [`MomentumIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MomentumIndicatorOverrides) | [`MoneyFlowIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MoneyFlowIndexIndicatorOverrides) | [`MovingAverageIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageIndicatorOverrides) | [`MovingAverageAdaptiveIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageAdaptiveIndicatorOverrides) | [`MovingAverageChannelIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageChannelIndicatorOverrides) | [`MovingAverageDoubleIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageDoubleIndicatorOverrides) | [`MovingAverageExponentialIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageExponentialIndicatorOverrides) | [`MovingAverageHammingIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageHammingIndicatorOverrides) | [`MovingAverageMultipleIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageMultipleIndicatorOverrides) | [`MovingAverageTripleIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageTripleIndicatorOverrides) | [`MovingAverageWeightedIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.MovingAverageWeightedIndicatorOverrides) | [`NetVolumeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.NetVolumeIndicatorOverrides) | [`OnBalanceVolumeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.OnBalanceVolumeIndicatorOverrides) | [`OverlayIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverrides) | [`ParabolicSARIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ParabolicSARIndicatorOverrides) | [`PivotPointsStandardIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PivotPointsStandardIndicatorOverrides) | [`PriceChannelIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PriceChannelIndicatorOverrides) | [`PriceOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PriceOscillatorIndicatorOverrides) | [`PriceVolumeTrendIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PriceVolumeTrendIndicatorOverrides) | [`RankCorrelationIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RankCorrelationIndexIndicatorOverrides) | [`RateOfChangeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RateOfChangeIndicatorOverrides) | [`RatioIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RatioIndicatorOverrides) | [`RegressionTrendIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RegressionTrendIndicatorOverrides) | [`RelativeStrengthIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RelativeStrengthIndexIndicatorOverrides) | [`RelativeVigorIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RelativeVigorIndexIndicatorOverrides) | [`RelativeVolatilityIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.RelativeVolatilityIndexIndicatorOverrides) | [`SMIErgodicIndicatorOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SMIErgodicIndicatorOscillatorIndicatorOverrides) | [`SessionsIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SessionsIndicatorOverrides) | [`SmoothedMovingAverageIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SmoothedMovingAverageIndicatorOverrides) | [`SpreadIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SpreadIndicatorOverrides) | [`StandardDeviationIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.StandardDeviationIndicatorOverrides) | [`StandardErrorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.StandardErrorIndicatorOverrides) | [`StandardErrorBandsIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.StandardErrorBandsIndicatorOverrides) | [`StochasticIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.StochasticIndicatorOverrides) | [`StochasticRSIIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.StochasticRSIIndicatorOverrides) | [`SuperTrendIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.SuperTrendIndicatorOverrides) | [`TRIXIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TRIXIndicatorOverrides) | [`TrendStrengthIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TrendStrengthIndexIndicatorOverrides) | [`TripleEMAIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TripleEMAIndicatorOverrides) | [`TrueStrengthIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TrueStrengthIndexIndicatorOverrides) | [`TypicalPriceIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.TypicalPriceIndicatorOverrides) | [`UltimateOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.UltimateOscillatorIndicatorOverrides) | [`VWAPIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VWAPIndicatorOverrides) | [`VWMAIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VWMAIndicatorOverrides) | [`VolatilityClosetoCloseIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityClosetoCloseIndicatorOverrides) | [`VolatilityIndexIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityIndexIndicatorOverrides) | [`VolatilityOHLCIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityOHLCIndicatorOverrides) | [`VolatilityZeroTrendClosetoCloseIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolatilityZeroTrendClosetoCloseIndicatorOverrides) | [`VolumeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeIndicatorOverrides) | [`VolumeOscillatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeOscillatorIndicatorOverrides) | [`VolumeProfileFixedRangeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeProfileFixedRangeIndicatorOverrides) | [`VolumeProfileVisibleRangeIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VolumeProfileVisibleRangeIndicatorOverrides) | [`VortexIndicatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.VortexIndicatorIndicatorOverrides) | [`WilliamsRIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.WilliamsRIndicatorOverrides) | [`WilliamsAlligatorIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.WilliamsAlligatorIndicatorOverrides) | [`WilliamsFractalIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.WilliamsFractalIndicatorOverrides) | [`ZigZagIndicatorOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ZigZagIndicatorOverrides) | [`OverlayIndicatorOverridesAll`](/charting-library-docs/latest/api/modules/Charting_Library# overlayindicatoroverridesall)

* * *

### StudyAvailableConstSourcesâ

Æ¬ **StudyAvailableConstSources** : `"open"` | `"high"` | `"low"` | `"close"` | `"hl2"` | `"hlc3"` | `"ohlc4"` | `"hlcc4"`

* * *

### StudyEventTypeâ

Æ¬ **StudyEventType** : `"create"` | `"remove"` | `"price_scale_changed"` | `"paste_study"`

An event related to a study.

* * *

### StudyFilledAreaStyleâ

Æ¬ **StudyFilledAreaStyle** : [`StudyFilledAreaSolidColorStyle`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFilledAreaSolidColorStyle) | [`StudyFilledAreaGradientColorStyle`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyFilledAreaGradientColorStyle)

* * *

### StudyInputIdâ

Æ¬ **StudyInputId** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`string`, `"StudyInputId"`>

* * *

### StudyInputInfoâ

Æ¬ **StudyInputInfo** : [`StudyBooleanInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBooleanInputInfo) | [`StudyTextInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextInputInfo) | [`StudySymbolInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySymbolInputInfo) | [`StudyResolutionInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyResolutionInputInfo) | [`StudySessionInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySessionInputInfo) | [`StudySourceInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySourceInputInfo) | [`StudyNumericInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyNumericInputInfo) | [`StudyPriceInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPriceInputInfo) | [`StudyColorInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyColorInputInfo) | [`StudyTimeInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTimeInputInfo) | [`StudyBarTimeInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBarTimeInputInfo) | [`StudyTextareaInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextareaInputInfo)

* * *

### StudyInputInfoListâ

Æ¬ **StudyInputInfoList** : readonly `Readonly`<[`StudyInputInfo`](/charting-library-docs/latest/api/modules/Charting_Library# studyinputinfo)>[]

* * *

### StudyInputValueâ

Æ¬ **StudyInputValue** : `string` | `number` | `boolean`

The value of a study input.

* * *

### StudyMetaInfoâ

Æ¬ **StudyMetaInfo** : [`DeepWriteable`](/charting-library-docs/latest/api/modules/Charting_Library# deepwriteable)<[`RawStudyMetaInformation`](/charting-library-docs/latest/api/modules/Charting_Library# rawstudymetainformation)> & { `id`: `string` }

* * *

### StudyOhlcPlotPreferencesâ

Æ¬ **StudyOhlcPlotPreferences** : [`StudyOhlcPlotBarsStylePreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcPlotBarsStylePreferences) | [`StudyOhlcPlotCandlesStylePreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcPlotCandlesStylePreferences)

* * *

### StudyOverrideValueTypeâ

Æ¬ **StudyOverrideValueType** : `string` | `number` | `boolean`

* * *

### StudyPlotDisplayModeâ

Æ¬ **StudyPlotDisplayMode** : [`Nominal`](/charting-library-docs/latest/api/modules/Charting_Library# nominal)<`number`, `"StudyPlotDisplayTarget"`> | [`StudyPlotDisplayTarget`](/charting-library-docs/latest/api/enums/Charting_Library.StudyPlotDisplayTarget)

* * *

### StudyPlotInfoâ

Æ¬ **StudyPlotInfo** : [`StudyPlotInformation`](/charting-library-docs/latest/api/modules/Charting_Library# studyplotinformation)

* * *

### StudyPlotInformationâ

Æ¬ **StudyPlotInformation** : [`StudyArrowsPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyArrowsPlotInfo) | [`StudyCharsPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCharsPlotInfo) | [`StudyColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyColorerPlotInfo) | [`StudyRgbaColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyRgbaColorerPlotInfo) | [`StudyDataPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDataPlotInfo) | [`StudyDataOffsetPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDataOffsetPlotInfo) | [`StudyLinePlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyLinePlotInfo) | [`StudyOhlcPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcPlotInfo) | [`StudyShapesPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyShapesPlotInfo) | [`StudyBarColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBarColorerPlotInfo) | [`StudyBgColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyBgColorerPlotInfo) | [`StudyTextColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextColorerPlotInfo) | [`StudyOhlcColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOhlcColorerPlotInfo) | [`StudyCandleWickColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCandleWickColorerPlotInfo) | [`StudyCandleBorderColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCandleBorderColorerPlotInfo) | [`StudyUpColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyUpColorerPlotInfo) | [`StudyDownColorerPlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDownColorerPlotInfo)

A description of a study plot.

* * *

### StudyPlotPreferencesâ

Æ¬ **StudyPlotPreferences** : [`StudyLinePlotPreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyLinePlotPreferences) | [`StudyShapesPlotPreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyShapesPlotPreferences) | [`StudyCharsPlotPreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyCharsPlotPreferences) | [`StudyArrowsPlotPreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyArrowsPlotPreferences)

Study plot style preferences.

* * *

### StudyPlotValueFormatâ

Æ¬ **StudyPlotValueFormat** : [`StudyPlotValueInheritFormat`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPlotValueInheritFormat) | [`StudyPlotValuePrecisionFormat`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyPlotValuePrecisionFormat)

* * *

### StudyPriceScaleâ

Æ¬ **StudyPriceScale** : `"new-left"` | `"new-right"` | `"no-scale"` | `"as-series"`

Price scale to display a study on.

Possible values are:

  * `new-left` \- attach the study to a new left price scale
  * `new-right` \- attach the study to a new right price scale
  * `no-scale` \- do not attach the study to any price scale. The study will be added in 'No Scale' mode
  * `as-series` \- attach the study to the price scale where the main series is attached (it is only applicable the study is added to the pane with the main series)

* * *

### StudyPrimitiveResultâ

Æ¬ **StudyPrimitiveResult** : (`number` | [`StudyResultValueWithOffset`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyResultValueWithOffset))[]

* * *

### SubscribeBarsCallbackâ

Æ¬ **SubscribeBarsCallback** : (`bar`: [`Bar`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar)) => `void`

#### Type declarationâ

â¸ (`bar`): `void`

##### Parametersâ

Name| Type  
---|---  
`bar`| [`Bar`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar)  
  
##### Returnsâ

`void`

* * *

### SuggestedQtyChangedListenerâ

Æ¬ **SuggestedQtyChangedListener** : (`newQty`: `number`) => `void`

#### Type declarationâ

â¸ (`newQty`): `void`

##### Parametersâ

Name| Type  
---|---  
`newQty`| `number`  
  
##### Returnsâ

`void`

* * *

### SupportedLineToolsâ

Æ¬ **SupportedLineTools** : `"text"` | `"anchored_text"` | `"note"` | `"anchored_note"` | `"signpost"` | `"double_curve"` | `"arc"` | `"icon"` | `"emoji"` | `"sticker"` | `"arrow_up"` | `"arrow_down"` | `"arrow_left"` | `"arrow_right"` | `"price_label"` | `"price_note"` | `"arrow_marker"` | `"flag"` | `"vertical_line"` | `"horizontal_line"` | `"cross_line"` | `"horizontal_ray"` | `"trend_line"` | `"info_line"` | `"trend_angle"` | `"arrow"` | `"ray"` | `"extended"` | `"parallel_channel"` | `"disjoint_angle"` | `"flat_bottom"` | `"anchored_vwap"` | `"pitchfork"` | `"schiff_pitchfork_modified"` | `"schiff_pitchfork"` | `"balloon"` | `"comment"` | `"inside_pitchfork"` | `"pitchfan"` | `"gannbox"` | `"gannbox_square"` | `"gannbox_fixed"` | `"gannbox_fan"` | `"fib_retracement"` | `"fib_trend_ext"` | `"fib_speed_resist_fan"` | `"fib_timezone"` | `"fib_trend_time"` | `"fib_circles"` | `"fib_spiral"` | `"fib_speed_resist_arcs"` | `"fib_channel"` | `"xabcd_pattern"` | `"cypher_pattern"` | `"abcd_pattern"` | `"callout"` | `"text_note"` | `"triangle_pattern"` | `"3divers_pattern"` | `"head_and_shoulders"` | `"fib_wedge"` | `"elliott_impulse_wave"` | `"elliott_triangle_wave"` | `"elliott_triple_combo"` | `"elliott_correction"` | `"elliott_double_combo"` | `"cyclic_lines"` | `"time_cycles"` | `"sine_line"` | `"long_position"` | `"short_position"` | `"forecast"` | `"date_range"` | `"price_range"` | `"date_and_price_range"` | `"bars_pattern"` | `"ghost_feed"` | `"projection"` | `"rectangle"` | `"rotated_rectangle"` | `"circle"` | `"ellipse"` | `"triangle"` | `"polyline"` | `"path"` | `"curve"` | `"cursor"` | `"dot"` | `"arrow_cursor"` | `"eraser"` | `"measure"` | `"zoom"` | `"brush"` | `"highlighter"` | `"regression_trend"` | `"fixed_range_volume_profile"` | `"table"`

* * *

### SymbolSearchCompleteOverrideFunctionâ

Æ¬ **SymbolSearchCompleteOverrideFunction** : (`symbol`: `string`, `searchResultItem?`: [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem)) => `Promise`<[`SymbolSearchCompleteData`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolSearchCompleteData)>

function to override the symbol input from symbol search dialogs

#### Type declarationâ

â¸ (`symbol`, `searchResultItem?`): `Promise`<[`SymbolSearchCompleteData`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolSearchCompleteData)>

##### Parametersâ

Name| Type| Description  
---|---|---  
`symbol`| `string`| input from the symbol search  
`searchResultItem?`| [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem)| -  
  
##### Returnsâ

`Promise`<[`SymbolSearchCompleteData`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolSearchCompleteData)>

* * *

### SymbolSourceâ

Æ¬ **SymbolSource** : [`SymbolInputSymbolSource`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolInputSymbolSource)

* * *

### SymbolTypeâ

Æ¬ **SymbolType** : `"stock"` | `"index"` | `"forex"` | `"futures"` | `"bitcoin"` | `"crypto"` | `"undefined"` | `"expression"` | `"spread"` | `"cfd"` | `"economic"` | `"equity"` | `"dr"` | `"bond"` | `"right"` | `"warrant"` | `"fund"` | `"structured"` | `"commodity"` | `"fundamental"` | `"spot"` | `"swap"` | `"option"`

* * *

### TableFormatTextFunctionâ

Æ¬ **TableFormatTextFunction** <`T`>: (`inputs`: [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.TableFormatterInputs)<`T`>) => `string`

A function that takes an [TableFormatterInputs](/charting-library-docs/latest/api/interfaces/Charting_Library.TableFormatterInputs) object and returns a `string`.

#### Type parametersâ

Name| Type  
---|---  
`T`| extends [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Charting_Library# tableformatterinputvalues) = [`TableFormatterInputValues`](/charting-library-docs/latest/api/modules/Charting_Library# tableformatterinputvalues)  
  
#### Type declarationâ

â¸ (`inputs`): `string`

##### Parametersâ

Name| Type  
---|---  
`inputs`| [`TableFormatterInputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.TableFormatterInputs)<`T`>  
  
##### Returnsâ

`string`

* * *

### TableFormatterInputValueâ

Æ¬ **TableFormatterInputValue** : `any`

* * *

### TableFormatterInputValuesâ

Æ¬ **TableFormatterInputValues** : [`TableFormatterInputValue`](/charting-library-docs/latest/api/modules/Charting_Library# tableformatterinputvalue)[]

* * *

### TextInputFieldValidatorâ

Æ¬ **TextInputFieldValidator** : (`value`: `string`) => [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Charting_Library# inputfieldvalidatorresult)

#### Type declarationâ

â¸ (`value`): [`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Charting_Library# inputfieldvalidatorresult)

##### Parametersâ

Name| Type  
---|---  
`value`| `string`  
  
##### Returnsâ

[`InputFieldValidatorResult`](/charting-library-docs/latest/api/modules/Charting_Library# inputfieldvalidatorresult)

* * *

### ThemeNameâ

Æ¬ **ThemeName** : `"light"` | `"dark"`

* * *

### TickMarkTypeâ

Æ¬ **TickMarkType** : `"Year"` | `"Month"` | `"DayOfMonth"` | `"Time"` | `"TimeWithSeconds"` | `"TimeWithMilliseconds"`

* * *

### TimeFrameValueâ

Æ¬ **TimeFrameValue** : [`TimeFramePeriodBack`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFramePeriodBack) | [`TimeFrameTimeRange`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFrameTimeRange)

Type of timeframe defined in the UI. Can either be a single one [TimeFramePeriodBack](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFramePeriodBack) or a range [TimeFrameTimeRange](/charting-library-docs/latest/api/interfaces/Charting_Library.TimeFrameTimeRange)

Examples:

  1. a timeframe object, `{type, value}`:
     * `type`: `period-back`.
     * `value`: valid timeframe is a number with letter D for days and M for months.
  2. a range object, `{type, from, to}`
     * `type`: `time-range`.
     * `from`, `to`: UNIX timestamps, UTC.

* * *

### TimeScaleMarkShapeâ

Æ¬ **TimeScaleMarkShape** : `"circle"` | `"earningUp"` | `"earningDown"` | `"earning"`

* * *

### TimeframeOptionâ

Æ¬ **TimeframeOption** : `string` | { `from`: `number` ; `to`: `number` }

* * *

### Timezoneâ

Æ¬ **Timezone** : `"Etc/UTC"` | [`CustomTimezones`](/charting-library-docs/latest/api/modules/Charting_Library# customtimezones)

* * *

### TimezoneIdâ

Æ¬ **TimezoneId** : [`CustomTimezones`](/charting-library-docs/latest/api/modules/Charting_Library# customtimezones) | `"Etc/UTC"` | `"exchange"`

* * *

### TradableSolutionsâ

Æ¬ **TradableSolutions** : [`TradableSolutionsTypes`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradableSolutionsTypes)[keyof [`TradableSolutionsTypes`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradableSolutionsTypes)]

`TradableSolutions` has one of the following keys:

  * `changeAccount` \- id of a sub-account suitable for trading the symbol
  * `changeSymbol` \- the symbol suitable for trading with current sub-account
  * `openUrl` \- the object with URL to be opened and text for solution button

* * *

### TradingDialogCustomFieldâ

Æ¬ **TradingDialogCustomField** : [`CheckboxFieldMetaInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.CheckboxFieldMetaInfo) | [`TextWithCheckboxFieldMetaInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.TextWithCheckboxFieldMetaInfo) | [`CustomComboBoxMetaInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomComboBoxMetaInfo) | [`TextFieldMetaInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.TextFieldMetaInfo)

* * *

### TradingTerminalChartTypeFavoritesâ

Æ¬ **TradingTerminalChartTypeFavorites** : [`ChartTypeFavorites`](/charting-library-docs/latest/api/modules/Charting_Library# charttypefavorites) | `"Renko"` | `"Kagi"` | `"Point & figure"` | `"Line Break"`

Chart type names for use within the `favorites` Widget Constructor option. This type is for Trading Platform, if you are looking for the Advanced Charts type then please see [ChartTypeFavorites](/charting-library-docs/latest/api/modules/Charting_Library# charttypefavorites).

See [Favorites](/charting-library-docs/latest/api/interfaces/Charting_Library.Favorites) for the Widget Constructor option where you can define these favorites, and [TradingTerminalWidgetOptions.favorites](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# favorites) for the Widget Constructor option.

* * *

### TradingTerminalFeaturesetâ

Æ¬ **TradingTerminalFeatureset** : [`ChartingLibraryFeatureset`](/charting-library-docs/latest/api/modules/Charting_Library# chartinglibraryfeatureset) | `"chart_crosshair_menu"` | `"support_multicharts"` | `"header_layouttoggle"` | `"add_to_watchlist"` | `"open_account_manager"` | `"trading_notifications"` | `"multiple_watchlists"` | `"show_trading_notifications_history"` | `"always_pass_called_order_to_modify"` | `"drawing_templates"` | `"trading_account_manager"` | `"right_toolbar"` | `"order_panel"` | `"order_info"` | `"buy_sell_buttons"` | `"broker_button"` | `"show_order_panel_on_start"` | `"order_panel_close_button"` | `"order_panel_undock"` | `"chart_hide_close_position_button"` | `"chart_hide_close_order_button"` | `"watchlist_import_export"` | `"dom_widget"` | `"keep_object_tree_widget_in_right_toolbar"` | `"show_last_price_and_change_only_in_series_legend"` | `"legend_last_day_change"` | `"watchlist_context_menu "` | `"hide_right_toolbar"` | `"hide_right_toolbar_tabs"` | `"hide_price_scale_if_all_sources_hidden"` | `"show_symbol_logo_in_account_manager"` | `"watchlist_sections"` | `"prefer_symbol_name_over_fullname"` | `"prefer_quote_short_name"` | `"image_drawingtool"` | `"pre_post_market_price_line"`

This is the list of all featuresets that work on Trading Platform (which is an extension of Advanced Charts)

* * *

### VisiblePlotsSetâ

Æ¬ **VisiblePlotsSet** : `"ohlcv"` | `"ohlc"` | `"c"`

* * *

### WatchListSymbolListAddedCallbackâ

Æ¬ **WatchListSymbolListAddedCallback** : (`listId`: `string`, `symbols`: `string`[]) => `void`

#### Type declarationâ

â¸ (`listId`, `symbols`): `void`

##### Parametersâ

Name| Type  
---|---  
`listId`| `string`  
`symbols`| `string`[]  
  
##### Returnsâ

`void`

* * *

### WatchListSymbolListChangedCallbackâ

Æ¬ **WatchListSymbolListChangedCallback** : (`listId`: `string`) => `void`

#### Type declarationâ

â¸ (`listId`): `void`

##### Parametersâ

Name| Type  
---|---  
`listId`| `string`  
  
##### Returnsâ

`void`

* * *

### WatchListSymbolListRemovedCallbackâ

Æ¬ **WatchListSymbolListRemovedCallback** : (`listId`: `string`) => `void`

#### Type declarationâ

â¸ (`listId`): `void`

##### Parametersâ

Name| Type  
---|---  
`listId`| `string`  
  
##### Returnsâ

`void`

* * *

### WatchListSymbolListRenamedCallbackâ

Æ¬ **WatchListSymbolListRenamedCallback** : (`listId`: `string`, `oldName`: `string`, `newName`: `string`) => `void`

#### Type declarationâ

â¸ (`listId`, `oldName`, `newName`): `void`

##### Parametersâ

Name| Type  
---|---  
`listId`| `string`  
`oldName`| `string`  
`newName`| `string`  
  
##### Returnsâ

`void`

* * *

### WatchedValueCallbackâ

Æ¬ **WatchedValueCallback** <`T`>: (`value`: `T`) => `void`

#### Type parametersâ

Name  
---  
`T`  
  
#### Type declarationâ

â¸ (`value`): `void`

##### Parametersâ

Name| Type  
---|---  
`value`| `T`  
  
##### Returnsâ

`void`

* * *

### WatermarkContentProviderâ

Æ¬ **WatermarkContentProvider** : (`data`: [`WatermarkContentData`](/charting-library-docs/latest/api/interfaces/Charting_Library.WatermarkContentData)) => [`WatermarkLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.WatermarkLine)[] | `null`

Custom watermark content provider which should return an array of watermark lines to be displayed. Return `null` if you would like to use the default content.

#### Type declarationâ

â¸ (`data`): [`WatermarkLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.WatermarkLine)[] | `null`

##### Parametersâ

Name| Type  
---|---  
`data`| [`WatermarkContentData`](/charting-library-docs/latest/api/interfaces/Charting_Library.WatermarkContentData)  
  
##### Returnsâ

[`WatermarkLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.WatermarkLine)[] | `null`

* * *

### WidgetOverridesâ

Æ¬ **WidgetOverrides** : [`DrawingOverrides`](/charting-library-docs/latest/api/modules/Charting_Library# drawingoverrides) & { `[key: string]`: `string` | `number` | `boolean`; }

## Variablesâ

### widgetâ

â¢ `Const` **widget** : [`ChartingLibraryWidgetConstructor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetConstructor)

## Functionsâ

### versionâ

â¸ **version**(): `string`

Returns a build version string. For example "CL v23.012 (internal id e0d59dc3 @ 2022-08-23T06:07:00.808Z)".

#### Returnsâ

`string`

The build version string.


---

## Module: Datafeed | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/api/modules/Datafeed*

  * [](/charting-library-docs/)
  * Modules
  * Datafeed

On this page

# Module: Datafeed

Datafeed JS API for TradingView Advanced Charts

## Interfacesâ

  * [Bar](/charting-library-docs/latest/api/interfaces/Datafeed.Bar)
  * [CurrencyItem](/charting-library-docs/latest/api/interfaces/Datafeed.CurrencyItem)
  * [DOMData](/charting-library-docs/latest/api/interfaces/Datafeed.DOMData)
  * [DOMLevel](/charting-library-docs/latest/api/interfaces/Datafeed.DOMLevel)
  * [DatafeedConfiguration](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedConfiguration)
  * [DatafeedQuoteValues](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedQuoteValues)
  * [DatafeedSymbolType](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedSymbolType)
  * [Exchange](/charting-library-docs/latest/api/interfaces/Datafeed.Exchange)
  * [HistoryMetadata](/charting-library-docs/latest/api/interfaces/Datafeed.HistoryMetadata)
  * [IDatafeedChartApi](/charting-library-docs/latest/api/interfaces/Datafeed.IDatafeedChartApi)
  * [IDatafeedQuotesApi](/charting-library-docs/latest/api/interfaces/Datafeed.IDatafeedQuotesApi)
  * [IExternalDatafeed](/charting-library-docs/latest/api/interfaces/Datafeed.IExternalDatafeed)
  * [LibrarySubsessionInfo](/charting-library-docs/latest/api/interfaces/Datafeed.LibrarySubsessionInfo)
  * [LibrarySymbolInfo](/charting-library-docs/latest/api/interfaces/Datafeed.LibrarySymbolInfo)
  * [Mark](/charting-library-docs/latest/api/interfaces/Datafeed.Mark)
  * [MarkCustomColor](/charting-library-docs/latest/api/interfaces/Datafeed.MarkCustomColor)
  * [PeriodParams](/charting-library-docs/latest/api/interfaces/Datafeed.PeriodParams)
  * [QuoteDataResponse](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteDataResponse)
  * [QuoteErrorData](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteErrorData)
  * [QuoteOkData](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteOkData)
  * [SearchSymbolResultItem](/charting-library-docs/latest/api/interfaces/Datafeed.SearchSymbolResultItem)
  * [SymbolInfoPriceSource](/charting-library-docs/latest/api/interfaces/Datafeed.SymbolInfoPriceSource)
  * [SymbolResolveExtension](/charting-library-docs/latest/api/interfaces/Datafeed.SymbolResolveExtension)
  * [TimescaleMark](/charting-library-docs/latest/api/interfaces/Datafeed.TimescaleMark)
  * [Unit](/charting-library-docs/latest/api/interfaces/Datafeed.Unit)

## Type Aliasesâ

### CustomTimezonesâ

Æ¬ **CustomTimezones** : `"Africa/Cairo"` | `"Africa/Casablanca"` | `"Africa/Johannesburg"` | `"Africa/Lagos"` | `"Africa/Nairobi"` | `"Africa/Tunis"` | `"America/Anchorage"` | `"America/Argentina/Buenos_Aires"` | `"America/Bogota"` | `"America/Caracas"` | `"America/Chicago"` | `"America/El_Salvador"` | `"America/Juneau"` | `"America/Lima"` | `"America/Los_Angeles"` | `"America/Mexico_City"` | `"America/New_York"` | `"America/Phoenix"` | `"America/Santiago"` | `"America/Sao_Paulo"` | `"America/Toronto"` | `"America/Vancouver"` | `"Asia/Almaty"` | `"Asia/Ashkhabad"` | `"Asia/Bahrain"` | `"Asia/Bangkok"` | `"Asia/Chongqing"` | `"Asia/Colombo"` | `"Asia/Dhaka"` | `"Asia/Dubai"` | `"Asia/Ho_Chi_Minh"` | `"Asia/Hong_Kong"` | `"Asia/Jakarta"` | `"Asia/Jerusalem"` | `"Asia/Kabul"` | `"Asia/Karachi"` | `"Asia/Kathmandu"` | `"Asia/Kolkata"` | `"Asia/Kuala_Lumpur"` | `"Asia/Kuwait"` | `"Asia/Manila"` | `"Asia/Muscat"` | `"Asia/Nicosia"` | `"Asia/Qatar"` | `"Asia/Riyadh"` | `"Asia/Seoul"` | `"Asia/Shanghai"` | `"Asia/Singapore"` | `"Asia/Taipei"` | `"Asia/Tehran"` | `"Asia/Tokyo"` | `"Asia/Yangon"` | `"Atlantic/Azores"` | `"Atlantic/Reykjavik"` | `"Australia/Adelaide"` | `"Australia/Brisbane"` | `"Australia/Perth"` | `"Australia/Sydney"` | `"Europe/Amsterdam"` | `"Europe/Athens"` | `"Europe/Belgrade"` | `"Europe/Berlin"` | `"Europe/Bratislava"` | `"Europe/Brussels"` | `"Europe/Bucharest"` | `"Europe/Budapest"` | `"Europe/Copenhagen"` | `"Europe/Dublin"` | `"Europe/Helsinki"` | `"Europe/Istanbul"` | `"Europe/Lisbon"` | `"Europe/London"` | `"Europe/Luxembourg"` | `"Europe/Madrid"` | `"Europe/Malta"` | `"Europe/Moscow"` | `"Europe/Oslo"` | `"Europe/Paris"` | `"Europe/Prague"` | `"Europe/Riga"` | `"Europe/Rome"` | `"Europe/Stockholm"` | `"Europe/Tallinn"` | `"Europe/Vienna"` | `"Europe/Vilnius"` | `"Europe/Warsaw"` | `"Europe/Zurich"` | `"Pacific/Auckland"` | `"Pacific/Chatham"` | `"Pacific/Fakaofo"` | `"Pacific/Honolulu"` | `"Pacific/Norfolk"` | `"US/Mountain"`

* * *

### DOMCallbackâ

Æ¬ **DOMCallback** : (`data`: [`DOMData`](/charting-library-docs/latest/api/interfaces/Datafeed.DOMData)) => `void`

#### Type declarationâ

â¸ (`data`): `void`

##### Parametersâ

Name| Type  
---|---  
`data`| [`DOMData`](/charting-library-docs/latest/api/interfaces/Datafeed.DOMData)  
  
##### Returnsâ

`void`

* * *

### DatafeedErrorCallbackâ

Æ¬ **DatafeedErrorCallback** : (`reason`: `string`) => `void`

#### Type declarationâ

â¸ (`reason`): `void`

##### Parametersâ

Name| Type  
---|---  
`reason`| `string`  
  
##### Returnsâ

`void`

* * *

### GetMarksCallbackâ

Æ¬ **GetMarksCallback** <`T`>: (`marks`: `T`[]) => `void`

#### Type parametersâ

Name  
---  
`T`  
  
#### Type declarationâ

â¸ (`marks`): `void`

##### Parametersâ

Name| Type  
---|---  
`marks`| `T`[]  
  
##### Returnsâ

`void`

* * *

### HistoryCallbackâ

Æ¬ **HistoryCallback** : (`bars`: [`Bar`](/charting-library-docs/latest/api/interfaces/Datafeed.Bar)[], `meta?`: [`HistoryMetadata`](/charting-library-docs/latest/api/interfaces/Datafeed.HistoryMetadata)) => `void`

#### Type declarationâ

â¸ (`bars`, `meta?`): `void`

##### Parametersâ

Name| Type  
---|---  
`bars`| [`Bar`](/charting-library-docs/latest/api/interfaces/Datafeed.Bar)[]  
`meta?`| [`HistoryMetadata`](/charting-library-docs/latest/api/interfaces/Datafeed.HistoryMetadata)  
  
##### Returnsâ

`void`

* * *

### LibrarySessionIdâ

Æ¬ **LibrarySessionId** : `"regular"` | `"extended"` | `"premarket"` | `"postmarket"`

* * *

### MarkConstColorsâ

Æ¬ **MarkConstColors** : `"red"` | `"green"` | `"blue"` | `"yellow"`

* * *

### Nominalâ

Æ¬ **Nominal** <`T`, `Name`>: `T` & { `[species]`: `Name` }

This is the generic type useful for declaring a nominal type, which does not structurally matches with the base type and the other types declared over the same base type

Usage:

**`Example`**
    
    
    type Index = Nominal<number, 'Index'>;  
    // let i: Index = 42; // this fails to compile  
    let i: Index = 42 as Index; // OK  
    

**`Example`**
    
    
    type TagName = Nominal<string, 'TagName'>;  
    

#### Type parametersâ

Name| Type  
---|---  
`T`| `T`  
`Name`| extends `string`  
  
* * *

### OnReadyCallbackâ

Æ¬ **OnReadyCallback** : (`configuration`: [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedConfiguration)) => `void`

#### Type declarationâ

â¸ (`configuration`): `void`

##### Parametersâ

Name| Type  
---|---  
`configuration`| [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedConfiguration)  
  
##### Returnsâ

`void`

* * *

### QuoteDataâ

Æ¬ **QuoteData** : [`QuoteOkData`](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteOkData) | [`QuoteErrorData`](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteErrorData)

* * *

### QuotesCallbackâ

Æ¬ **QuotesCallback** : (`data`: [`QuoteData`](/charting-library-docs/latest/api/modules/Datafeed# quotedata)[]) => `void`

Callback to provide Quote data.

#### Type declarationâ

â¸ (`data`): `void`

##### Parametersâ

Name| Type| Description  
---|---|---  
`data`| [`QuoteData`](/charting-library-docs/latest/api/modules/Datafeed# quotedata)[]| Quote Data  
  
##### Returnsâ

`void`

* * *

### QuotesErrorCallbackâ

Æ¬ **QuotesErrorCallback** : (`reason`: `string`) => `void`

Error callback for quote data request.

#### Type declarationâ

â¸ (`reason`): `void`

##### Parametersâ

Name| Type| Description  
---|---|---  
`reason`| `string`| message describing the reason for the error  
  
##### Returnsâ

`void`

* * *

### ResolutionStringâ

Æ¬ **ResolutionString** : [`Nominal`](/charting-library-docs/latest/api/modules/Datafeed# nominal)<`string`, `"ResolutionString"`>

Resolution or time interval is a time period of one bar. Advanced Charts supports tick, intraday (seconds, minutes, hours), and DWM (daily, weekly, monthly) resolutions. The table below describes how to specify different types of resolutions:

Resolution| Format| Example  
---|---|---  
Ticks| `xT`| `1T` â one tick, `5T` â five ticks, `100T` â one hundred ticks  
Seconds| `xS`| `1S` â one second  
Minutes| `x`| `1` â one minute  
Hours| `x` minutes| `60` â one hour  
Days| `xD`| `1D` â one day  
Weeks| `xW`| `1W` â one week  
Months| `xM`| `1M` â one month  
Years| `xM` months| `12M` â one year  
  
Refer to [Resolution](/charting-library-docs/latest/core_concepts/Resolution) for more information.

* * *

### ResolveCallbackâ

Æ¬ **ResolveCallback** : (`symbolInfo`: [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Datafeed.LibrarySymbolInfo)) => `void`

#### Type declarationâ

â¸ (`symbolInfo`): `void`

##### Parametersâ

Name| Type  
---|---  
`symbolInfo`| [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Datafeed.LibrarySymbolInfo)  
  
##### Returnsâ

`void`

* * *

### SearchSymbolsCallbackâ

Æ¬ **SearchSymbolsCallback** : (`items`: [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Datafeed.SearchSymbolResultItem)[]) => `void`

#### Type declarationâ

â¸ (`items`): `void`

##### Parametersâ

Name| Type  
---|---  
`items`| [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Datafeed.SearchSymbolResultItem)[]  
  
##### Returnsâ

`void`

* * *

### SeriesFormatâ

Æ¬ **SeriesFormat** : `"price"` | `"volume"`

* * *

### ServerTimeCallbackâ

Æ¬ **ServerTimeCallback** : (`serverTime`: `number`) => `void`

#### Type declarationâ

â¸ (`serverTime`): `void`

##### Parametersâ

Name| Type  
---|---  
`serverTime`| `number`  
  
##### Returnsâ

`void`

* * *

### SubscribeBarsCallbackâ

Æ¬ **SubscribeBarsCallback** : (`bar`: [`Bar`](/charting-library-docs/latest/api/interfaces/Datafeed.Bar)) => `void`

#### Type declarationâ

â¸ (`bar`): `void`

##### Parametersâ

Name| Type  
---|---  
`bar`| [`Bar`](/charting-library-docs/latest/api/interfaces/Datafeed.Bar)  
  
##### Returnsâ

`void`

* * *

### TimeScaleMarkShapeâ

Æ¬ **TimeScaleMarkShape** : `"circle"` | `"earningUp"` | `"earningDown"` | `"earning"`

* * *

### Timezoneâ

Æ¬ **Timezone** : `"Etc/UTC"` | [`CustomTimezones`](/charting-library-docs/latest/api/modules/Datafeed# customtimezones)

* * *

### VisiblePlotsSetâ

Æ¬ **VisiblePlotsSet** : `"ohlcv"` | `"ohlc"` | `"c"`
