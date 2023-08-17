package morningrolecall.heulgit.gm.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class GmUserDetail implements Serializable {

	private static final long serialVersionUID = 211211211211L;
	private String id;
	private String avater_url;
}
