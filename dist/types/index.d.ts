export type Row = Record<string, string | number | boolean | null>;
export type Settings = Record<string, unknown>;
export type Encoding = {
    id: string;
    name: string;
    /** true when the encoding takes measures (numbers), false for dimensions */
    measures: boolean;
    roles: string[];
    dataTypes: string[];
    tooltip?: string;
};
export type ExtensionInfo = {
    id: string;
    encodings: Encoding[];
    configurable: boolean;
    /**
     * 'authoring': the extension only maps its fields in authoring mode (PowerKPIs). On first use, with no
     * saved settings, the host boots it in authoring mode, lets it save its mapping, then reloads it.
     */
    setup?: 'authoring';
};
export type MountOptions = {
    /** Extension URL from the Apps for Tableau portal */
    url: string;
    data: Row[];
    /**
     * The extension's encodings, inline. Skips fetching <url>/encoding/encoding.json, which sandboxed
     * pages (Claude artifacts, ChatGPT canvas) often can't do.
     */
    extension?: {
        id: string;
        encodings: {
            id: string;
            measures: boolean;
            name?: string;
        }[];
        configurable?: boolean;
        setup?: 'authoring';
    };
    /** Encoding id → column(s). Omit to put text columns on the first dimension encoding and numbers on the first measure encoding. */
    fields?: Record<string, string | string[]>;
    /** Measure → aggregation shown in the extension (default "sum") */
    aggregations?: Record<string, string>;
    /** "authoring" shows the extension's configure option (default "viewing") */
    mode?: 'viewing' | 'authoring';
    /** Extension settings. They win over saved settings, so a change in code always shows. */
    settings?: Settings;
    /** Persist what the extension saves (its own field mapping, for one) in localStorage under this key */
    storageKey?: string;
    userId?: string;
    onSettingsChange?: (settings: Settings) => void;
    /** Rows the user selected in the extension ([] when cleared) */
    onSelect?: (rows: Row[]) => void;
    /** Filter or value selection from the extension; values [] means cleared */
    onFilter?: (filter: {
        field: string;
        values: string[];
    }) => void;
    onReady?: (info: ExtensionInfo & {
        canConfigure: boolean;
    }) => void;
};
/** Reads <url>/encoding/encoding.json. */
export declare function getEncodings(url: string): Promise<ExtensionInfo>;
export declare class ExtensionViz {
    readonly info: ExtensionInfo;
    canConfigure: boolean;
    private opts;
    private el;
    private state;
    private dialogState;
    private iframe;
    private dialog;
    private dialogFrame;
    private ready;
    private settings;
    private data;
    constructor(el: HTMLElement, info: ExtensionInfo, opts: MountOptions);
    /** Replace the rows (and optionally the field mapping); the extension re-reads them. */
    setData(rows: Row[], fields?: Record<string, string | string[]> | undefined): void;
    private pendingVisualData?;
    /** Switching mode reloads the extension, like reopening it in Tableau. */
    setMode(mode: 'viewing' | 'authoring'): void;
    /** Opens the extension's own configuration dialog (authoring mode only). */
    configure(): void;
    getSettings(): Settings;
    destroy(): void;
    private start;
    private settingUp;
    private reportedCanConfigure?;
    private extensionSaved;
    private setupTimers;
    private clearSetupTimers;
    private saveSettings;
    private notifySettings;
    private onMessage;
    private openDialog;
    private closeDialog;
}
/** Mounts an extension into `el`. Resolves once its encodings are loaded; the iframe boots right after. */
export declare function mount(el: HTMLElement, opts: MountOptions): Promise<ExtensionViz>;
