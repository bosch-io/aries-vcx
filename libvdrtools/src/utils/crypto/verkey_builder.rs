use crate::services::CryptoService;
use crate::utils::crypto::base58::{FromBase58, ToBase58};
use indy_api_types::errors::prelude::*;

pub fn build_full_verkey(dest: &str, verkey: Option<&str>) -> Result<String, IndyError> {
    if let Some(verkey) = verkey {
        let (verkey, crypto_type) = if verkey.contains(':') {
            let splits: Vec<&str> = verkey.split(':').collect();
            (splits[0], Some(splits[1]))
        } else {
            (verkey, None)
        };

        let verkey = if verkey.starts_with('~') {
            let mut result = dest.from_base58()?;
            let mut end = verkey[1..].from_base58()?;
            result.append(&mut end);
            result.to_base58()
        } else {
            verkey.to_owned()
        };

        let verkey = if let Some(crypto_type) = crypto_type {
            format!("{}:{}", verkey, crypto_type)
        } else {
            verkey
        };

        Ok(verkey)
    } else {
        // Cryptonym
        Ok(dest.to_owned())
    }
}

pub fn split_verkey(verkey: &str) -> (&str, &str) {
    let position = verkey.find(':');
    match position {
        Some(p) => {
            let cryptoname = if p + 1 < verkey.len() {
                verkey[p + 1..].as_ref()
            } else {
                CryptoService::defualt_crypto_type()
            };
            let v = if p > 0 { verkey[..p].as_ref() } else { "" };
            (v, cryptoname)
        }
        None => (verkey, CryptoService::defualt_crypto_type()),
    }
}

pub fn verkey_get_cryptoname(verkey: &str) -> &str {
    let position = verkey.find(':');
    match position {
        Some(p) => {
            if p + 1 < verkey.len() {
                verkey[p + 1..].as_ref()
            } else {
                CryptoService::defualt_crypto_type()
            }
        }
        None => CryptoService::defualt_crypto_type(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn split_verkey_empty() {
        assert_eq!(split_verkey(""), ("", CryptoService::defualt_crypto_type()))
    }

    #[test]
    fn split_verkey_single_colon() {
        assert_eq!(
            split_verkey(":"),
            ("", CryptoService::defualt_crypto_type())
        )
    }

    #[test]
    fn split_verkey_ends_with_colon() {
        assert_eq!(
            split_verkey("foo:"),
            ("foo", CryptoService::defualt_crypto_type())
        )
    }

    #[test]
    fn split_verkey_starts_with_colon() {
        assert_eq!(split_verkey(":bar"), ("", "bar"))
    }

    #[test]
    fn split_verkey_works() {
        assert_eq!(split_verkey("foo:bar:baz"), ("foo", "bar:baz"))
    }

    #[test]
    fn verkey_get_cryptoname_empty() {
        assert_eq!(
            verkey_get_cryptoname(""),
            CryptoService::defualt_crypto_type()
        )
    }

    #[test]
    fn verkey_get_cryptoname_single_colon() {
        assert_eq!(
            verkey_get_cryptoname(":"),
            CryptoService::defualt_crypto_type()
        )
    }

    #[test]
    fn verkey_get_cryptoname_ends_with_colon() {
        assert_eq!(
            verkey_get_cryptoname("foo:"),
            CryptoService::defualt_crypto_type()
        )
    }

    #[test]
    fn verkey_get_cryptoname_works() {
        assert_eq!(verkey_get_cryptoname("foo:bar"), "bar")
    }
}
