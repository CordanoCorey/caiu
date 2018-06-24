export class Config {
    dev = false;
    test = false;
    staging = false;
    production = false;
    apiBaseUrl = '';
}

export class ViewConfig extends Config {
    viewMode: 'Default' | 'Classic' | 'Material' = 'Default';
}
