package morningrolecall.heulgit.util;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@ConfigurationProperties(prefix = "app")
public class AppProperties {

	private final Auth auth = new Auth();

	@Getter
	@Setter
	public static class Auth {
		private long accessExpiry;
		private long refreshExpiry;
	}
}
